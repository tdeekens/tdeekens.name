import type { NextApiRequest, NextApiResponse } from 'next';
import {
  convertToModelMessages,
  streamText,
  type ModelMessage,
  type UIMessage,
} from 'ai';
import { ASK_ABOUT_ME_CONFIG } from '@lib/ask-about-me/config';
import { getCvContext } from '@lib/ask-about-me/context';
import { buildSystemMessages } from '@lib/ask-about-me/system-prompt';
import { askRequestSchema } from '@lib/ask-about-me/schema';
import { createInMemoryRateLimiter } from '@lib/ask-about-me/rate-limit';
import type { AskErrorResponse } from '@lib/ask-about-me/shared-types';

const limiter = createInMemoryRateLimiter(ASK_ABOUT_ME_CONFIG.rateLimit);

const sendError = (
  res: NextApiResponse,
  status: number,
  body: AskErrorResponse,
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
  return req.socket.remoteAddress ?? 'anon';
};

export const config = { api: { bodyParser: { sizeLimit: '64kb' } } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendError(res, 405, {
      error: 'method_not_allowed',
      message: 'POST only',
    });
  }

  const parsed = askRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    console.error('[ask-about-me] invalid body', parsed.error.issues);
    return sendError(res, 400, {
      error: 'invalid_body',
      message: 'Request body did not match schema',
    });
  }

  const limit = limiter.check(getClientKey(req));
  if (!limit.allowed) {
    res.setHeader(
      'Retry-After',
      String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
    );
    return sendError(res, 429, {
      error: 'rate_limited',
      message: 'Too many requests. Try again later.',
      retryAfterSeconds: Math.ceil((limit.resetAt - Date.now()) / 1000),
    });
  }

  let context;
  try {
    context = await getCvContext({ baseUrl: getBaseUrl(req) });
  } catch {
    return sendError(res, 503, {
      error: 'context_unavailable',
      message: 'Could not load context',
    });
  }

  const userMessages = await convertToModelMessages(
    parsed.data.messages as UIMessage[],
  );
  const messages: ModelMessage[] = [
    ...buildSystemMessages(context),
    ...userMessages,
  ];

  const result = streamText({
    model: ASK_ABOUT_ME_CONFIG.model.id,
    messages,
    maxOutputTokens: ASK_ABOUT_ME_CONFIG.model.maxOutputTokens,
    temperature: ASK_ABOUT_ME_CONFIG.model.temperature,
  });

  result.pipeUIMessageStreamToResponse(res, {
    headers: {
      'Cache-Control': 'no-cache, no-transform',
      'Content-Encoding': 'none',
      'X-Accel-Buffering': 'no',
    },
    onError: () => 'Something went wrong. Please try again.',
  });
}
