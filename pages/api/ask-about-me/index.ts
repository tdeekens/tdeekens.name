import type { NextApiRequest, NextApiResponse } from 'next';
import {
  convertToModelMessages,
  streamText,
  type ModelMessage,
  type UIMessage,
} from 'ai';
import { waitUntil } from '@vercel/functions';
import { ASK_ABOUT_ME_CONFIG } from '@lib/ask-about-me/config';
import { getCvContext } from '@lib/ask-about-me/context';
import { buildSystemMessages } from '@lib/ask-about-me/system-prompt';
import { askRequestSchema } from '@lib/ask-about-me/schema';
import { createInMemoryRateLimiter } from '@lib/ask-about-me/rate-limit';
import { logger, flushLogger } from '@lib/ask-about-me/logger';

type AskErrorCode =
  | 'method_not_allowed'
  | 'invalid_body'
  | 'rate_limited'
  | 'context_unavailable';

type AskErrorBody = {
  error: AskErrorCode;
  message: string;
  retryAfterSeconds?: number;
};

const limiter = createInMemoryRateLimiter(ASK_ABOUT_ME_CONFIG.rateLimit);

const sendError = (
  res: NextApiResponse,
  status: number,
  body: AskErrorBody,
) => {
  res.status(status).json(body);
};

const firstHeaderValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const getBaseUrl = (req: NextApiRequest): string => {
  const host = req.headers.host;
  if (host) {
    const protocol =
      firstHeaderValue(req.headers['x-forwarded-proto']) ||
      (process.env.VERCEL_URL ? 'https' : 'http');
    return `${protocol}://${host}`;
  }
  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL.startsWith('http')
      ? process.env.VERCEL_URL
      : `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
};

const getClientKey = (req: NextApiRequest): string => {
  const forwarded = firstHeaderValue(req.headers['x-forwarded-for']);
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress ?? '';
};

export const config = { api: { bodyParser: { sizeLimit: '64kb' } } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const log = logger.child({ reqId: crypto.randomUUID() });
  const startedAt = Date.now();

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendError(res, 405, {
      error: 'method_not_allowed',
      message: 'POST only',
    });
  }

  const parsed = askRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    log.warn({ issues: parsed.error.issues }, 'invalid body');
    return sendError(res, 400, {
      error: 'invalid_body',
      message: 'Request body did not match schema',
    });
  }

  const limit = limiter.check(getClientKey(req));
  if (!limit.allowed) {
    const retryAfterSeconds = Math.ceil((limit.resetAt - Date.now()) / 1000);
    res.setHeader('Retry-After', String(retryAfterSeconds));
    log.warn({ retryAfterSeconds }, 'rate limited');
    return sendError(res, 429, {
      error: 'rate_limited',
      message: 'Too many requests. Try again later.',
      retryAfterSeconds,
    });
  }

  const context = await getCvContext(getBaseUrl(req)).catch(
    (error: unknown) => {
      log.error({ err: error }, 'context load failed');
      return null;
    },
  );
  if (!context) {
    return sendError(res, 503, {
      error: 'context_unavailable',
      message: 'Could not load context',
    });
  }

  const userMessagesIn = parsed.data.messages.filter((m) => m.role === 'user');
  const question =
    userMessagesIn
      .at(-1)
      ?.parts.filter(
        (p): p is { type: 'text'; text: string } => p.type === 'text',
      )
      .map((p) => p.text)
      .join(' ')
      .trim() ?? '';
  const turn = userMessagesIn.length;

  const { variant } = parsed.data;

  log.info(
    { question, turn, variant, contextTokens: context.approxTokens },
    'asked',
  );

  const messages: ModelMessage[] = await convertToModelMessages(
    parsed.data.messages as UIMessage[],
  );

  const controller = new AbortController();
  res.on('close', () => controller.abort());

  const result = streamText({
    model: ASK_ABOUT_ME_CONFIG.model.id,
    instructions: buildSystemMessages(context, variant),
    messages,
    maxOutputTokens: ASK_ABOUT_ME_CONFIG.model.maxOutputTokens,
    temperature: ASK_ABOUT_ME_CONFIG.model.temperature,
    abortSignal: controller.signal,
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
      waitUntil(flushLogger());
    },
    onError: ({ error }) => {
      log.error({ err: error }, 'stream error');
    },
  });

  result.pipeUIMessageStreamToResponse(res, {
    headers: {
      'Cache-Control': 'no-cache, no-transform',
      'Content-Encoding': 'none',
      'X-Accel-Buffering': 'no',
      'X-Context-Tokens': String(context.approxTokens),
    },
    onError: () => 'Something went wrong. Please try again.',
  });
}
