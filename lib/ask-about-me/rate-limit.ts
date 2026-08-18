export type RateLimiter = {
  check: (key: string) => {
    allowed: boolean;
    remaining: number;
    resetAt: number;
  };
};

type Bucket = {
  count: number;
  windowStart: number;
};

const MAX_TRACKED_KEYS = 1000;

export const createInMemoryRateLimiter = (opts: {
  windowMs: number;
  maxRequests: number;
}): RateLimiter => {
  const buckets = new Map<string, Bucket>();

  const evictExpired = (now: number) => {
    buckets.forEach((bucket, key) => {
      if (now - bucket.windowStart >= opts.windowMs) {
        buckets.delete(key);
      }
    });
  };

  return {
    check: (key) => {
      const now = Date.now();
      if (buckets.size >= MAX_TRACKED_KEYS) {
        evictExpired(now);
      }

      const bucket = buckets.get(key);
      if (!bucket || now - bucket.windowStart >= opts.windowMs) {
        buckets.set(key, { count: 1, windowStart: now });
        return {
          allowed: true,
          remaining: opts.maxRequests - 1,
          resetAt: now + opts.windowMs,
        };
      }

      bucket.count += 1;
      return {
        allowed: bucket.count <= opts.maxRequests,
        remaining: Math.max(0, opts.maxRequests - bucket.count),
        resetAt: bucket.windowStart + opts.windowMs,
      };
    },
  };
};
