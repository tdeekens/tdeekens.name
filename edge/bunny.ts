import process from 'node:process';

/**
 * Bunny Edge Scripting entry (standalone script, "Run script before cache"
 * enabled). Static files come from a Bunny Storage zone exposed through its
 * own pull zone (`STATIC_ORIGIN`). Bundled by `scripts/build-edge.ts`.
 *
 * Env: STATIC_ORIGIN, STAGING_HOSTS (comma separated), AI_PROVIDER,
 * AI_BASE_URL, AI_API_KEY, AI_MODEL, BUNNY_DATABASE_URL,
 * BUNNY_DATABASE_AUTH_TOKEN.
 */
import { connect } from '@bunny.net/database-client';
import * as BunnySDK from '@bunny.net/edgescript-sdk';
import { ASK_ABOUT_ME_CONFIG } from '@lib/ask-about-me/config';
import type { CvContext } from '@lib/ask-about-me/context';

import context from './generated/context.json';
import { createHandler } from './handler';
import { createLog } from './log';
import { createModel } from './model';
import {
  type AsyncRateLimiter,
  inMemoryRateLimiter,
  sqlRateLimiter,
  withFallback,
} from './rate-limit';

declare const Bunny: { v1: { waitUntil: (promise: Promise<unknown>) => void } };

const env = process.env;
const log = createLog({ host: 'bunny' });

const staticOrigin = (env.STATIC_ORIGIN ?? '').replace(/\/$/, '');
const stagingHosts = new Set(
  (env.STAGING_HOSTS ?? '')
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean),
);

function createLimiter(): AsyncRateLimiter {
  const memory = inMemoryRateLimiter(ASK_ABOUT_ME_CONFIG.rateLimit);
  if (!env.BUNNY_DATABASE_URL || !env.BUNNY_DATABASE_AUTH_TOKEN) {
    log.warn({}, 'no BUNNY_DATABASE_URL, using in-memory rate limits');
    return memory;
  }
  const db = connect({
    url: env.BUNNY_DATABASE_URL,
    authToken: env.BUNNY_DATABASE_AUTH_TOKEN,
    timeout: 2000,
  });
  const shared = sqlRateLimiter(
    (sql, args) =>
      db
        .prepare(sql)
        .bind(...args)
        .first<Record<string, unknown>>(),
    ASK_ABOUT_ME_CONFIG.rateLimit,
  );
  return withFallback(shared, memory, (error) =>
    log.error({ err: error }, 'rate limit store failed, using memory'),
  );
}

const handle = createHandler({
  fetchAsset: (path, method) => fetch(`${staticOrigin}${path}`, { method }),
  isStaging: (url) => stagingHosts.has(url.hostname),
  waitUntil: (promise) => Bunny.v1.waitUntil(promise),
  ask: {
    context: context as CvContext,
    limiter: createLimiter(),
    getModel: () =>
      createModel({
        AI_PROVIDER: env.AI_PROVIDER,
        AI_BASE_URL: env.AI_BASE_URL,
        AI_API_KEY: env.AI_API_KEY,
        AI_MODEL: env.AI_MODEL,
      }),
    log,
  },
});

BunnySDK.net.http.serve(async (request: Request) => {
  try {
    return await handle(request);
  } catch (error) {
    log.error({ err: error, url: request.url }, 'unhandled error');
    return new Response('Internal Server Error', { status: 500 });
  }
});
