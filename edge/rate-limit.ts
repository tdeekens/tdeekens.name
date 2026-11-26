import { createInMemoryRateLimiter } from '@lib/ask-about-me/rate-limit';

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

/** Async so a shared store (Bunny Database, Workers KV) can back it. */
export type AsyncRateLimiter = {
  check: (key: string) => Promise<RateLimitResult>;
};

export const inMemoryRateLimiter = (opts: {
  windowMs: number;
  maxRequests: number;
}): AsyncRateLimiter => {
  const limiter = createInMemoryRateLimiter(opts);
  return { check: async (key) => limiter.check(key) };
};

/** Returns the first row of a parameterized statement, e.g. via Bunny Database. */
export type SqlFirst = (
  sql: string,
  args: (string | number)[],
) => Promise<Record<string, unknown> | null>;

/**
 * Fixed-window limiter in a shared SQL table, so limits hold across edge
 * instances. Expects:
 *
 *   CREATE TABLE IF NOT EXISTS rate_limits (
 *     key TEXT PRIMARY KEY, window_start INTEGER NOT NULL, count INTEGER NOT NULL
 *   );
 */
export const sqlRateLimiter = (
  first: SqlFirst,
  opts: { windowMs: number; maxRequests: number },
): AsyncRateLimiter => ({
  check: async (key) => {
    const now = Date.now();
    const windowStart = now - (now % opts.windowMs);
    // One round trip: start a new window or count within the current one.
    const row = await first(
      `INSERT INTO rate_limits (key, window_start, count) VALUES (?, ?, 1)
       ON CONFLICT(key) DO UPDATE SET
         count = CASE WHEN window_start = excluded.window_start THEN count + 1 ELSE 1 END,
         window_start = excluded.window_start
       RETURNING count`,
      [key, windowStart],
    );
    const count = Number(row?.count ?? 1);
    return {
      allowed: count <= opts.maxRequests,
      remaining: Math.max(0, opts.maxRequests - count),
      resetAt: windowStart + opts.windowMs,
    };
  },
});

/**
 * Uses `primary`, and `fallback` whenever it throws, so an outage of the shared
 * store degrades to per-instance limits instead of taking the chat down. The
 * gateway's spend limit stays the hard backstop.
 */
export const withFallback = (
  primary: AsyncRateLimiter,
  fallback: AsyncRateLimiter,
  onError: (error: unknown) => void,
): AsyncRateLimiter => ({
  check: async (key) => {
    try {
      return await primary.check(key);
    } catch (error) {
      onError(error);
      return fallback.check(key);
    }
  },
});
