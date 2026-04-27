type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

export type RateLimiter = {
  check: (key: string) => RateLimitResult;
};

type Bucket = {
  count: number;
  windowStart: number;
};

type CreateRateLimiterOptions = {
  windowMs: number;
  maxRequests: number;
  now?: () => number;
};

export const createInMemoryRateLimiter = ({
  windowMs,
  maxRequests,
  now = Date.now,
}: CreateRateLimiterOptions): RateLimiter => {
  const buckets = new Map<string, Bucket>();

  return {
    check: (key) => {
      const current = now();
      const bucket = buckets.get(key);

      if (!bucket || current - bucket.windowStart >= windowMs) {
        buckets.set(key, { count: 1, windowStart: current });
        return {
          allowed: true,
          remaining: maxRequests - 1,
          resetAt: current + windowMs,
        };
      }

      bucket.count += 1;
      const resetAt = bucket.windowStart + windowMs;
      return {
        allowed: bucket.count <= maxRequests,
        remaining: Math.max(0, maxRequests - bucket.count),
        resetAt,
      };
    },
  };
};
