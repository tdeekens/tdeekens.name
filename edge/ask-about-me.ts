import { ASK_ABOUT_ME_CONFIG } from '@lib/ask-about-me/config';
import type { CvContext } from '@lib/ask-about-me/context';
import { askRequestSchema } from '@lib/ask-about-me/schema';
import { buildSystemMessages } from '@lib/ask-about-me/system-prompt';
import {
  convertToModelMessages,
  streamText,
  type LanguageModel,
  type ModelMessage,
  type UIMessage,
} from 'ai';

import type { Log } from './log';
import type { AsyncRateLimiter } from './rate-limit';

type AskErrorCode =
  | 'method_not_allowed'
  | 'invalid_body'
  | 'payload_too_large'
  | 'rate_limited'
  | 'model_unavailable';

const MAX_BODY_BYTES = 64 * 1024;

const json = (
  status: number,
  body: { error: AskErrorCode; message: string; retryAfterSeconds?: number },
  headers: Record<string, string> = {},
) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
  });

export type AskDeps = {
  context: CvContext;
  limiter: AsyncRateLimiter;
  /** Lazy so a missing AI config only fails chat requests, not the site. */
  getModel: () => LanguageModel;
  log: Log;
};

/** Client IP as forwarded by the CDN; falls back to a shared bucket. */
export const clientKey = (request: Request): string =>
  request.headers.get('cf-connecting-ip') ??
  request.headers.get('x-real-ip') ??
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
  'unknown';

export async function handleAsk(
  request: Request,
  deps: AskDeps,
): Promise<Response> {
  const log = deps.log.child({
    feature: 'ask-about-me',
    reqId: crypto.randomUUID(),
  });
  const startedAt = Date.now();

  if (request.method !== 'POST') {
    return json(
      405,
      { error: 'method_not_allowed', message: 'POST only' },
      { Allow: 'POST' },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json(413, { error: 'payload_too_large', message: 'Body too large' });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    body = undefined;
  }
  const parsed = askRequestSchema.safeParse(body);
  if (!parsed.success) {
    log.warn({ issues: parsed.error.issues }, 'invalid body');
    return json(400, {
      error: 'invalid_body',
      message: 'Request body did not match schema',
    });
  }

  const limit = await deps.limiter.check(clientKey(request));
  if (!limit.allowed) {
    const retryAfterSeconds = Math.ceil((limit.resetAt - Date.now()) / 1000);
    log.warn({ retryAfterSeconds }, 'rate limited');
    return json(
      429,
      {
        error: 'rate_limited',
        message: 'Too many requests. Try again later.',
        retryAfterSeconds,
      },
      { 'Retry-After': String(retryAfterSeconds) },
    );
  }

  let model: LanguageModel;
  try {
    model = deps.getModel();
  } catch (error) {
    log.error({ err: error }, 'model unavailable');
    return json(503, {
      error: 'model_unavailable',
      message: 'The assistant is not available right now',
    });
  }

  const userMessages = parsed.data.messages.filter((m) => m.role === 'user');
  const question =
    userMessages
      .at(-1)
      ?.parts.filter(
        (p): p is { type: 'text'; text: string } => p.type === 'text',
      )
      .map((p) => p.text)
      .join(' ')
      .trim() ?? '';
  const turn = userMessages.length;
  const { variant } = parsed.data;
  const { context } = deps;

  log.info(
    { question, turn, variant, contextTokens: context.approxTokens },
    'asked',
  );

  const messages: ModelMessage[] = await convertToModelMessages(
    parsed.data.messages as UIMessage[],
  );

  const result = streamText({
    model,
    instructions: buildSystemMessages(context, variant),
    messages,
    maxOutputTokens: ASK_ABOUT_ME_CONFIG.model.maxOutputTokens,
    temperature: ASK_ABOUT_ME_CONFIG.model.temperature,
    abortSignal: request.signal,
    onEnd: ({ usage, finishReason, text }) => {
      log.info(
        {
          question,
          turn,
          variant,
          finishReason,
          latencyMs: Date.now() - startedAt,
          inputTokens: usage.inputTokens,
          cachedInputTokens: usage.inputTokenDetails.cacheReadTokens,
          outputTokens: usage.outputTokens,
          answerChars: text.length,
        },
        'answered',
      );
    },
    onError: ({ error }) => {
      log.error({ err: error }, 'stream error');
    },
  });

  return result.toUIMessageStreamResponse({
    headers: {
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
      'X-Context-Tokens': String(context.approxTokens),
    },
    onError: () => 'Something went wrong. Please try again.',
  });
}
