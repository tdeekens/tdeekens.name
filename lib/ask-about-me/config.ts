export type SourcePath =
  | '/curriculum-vitae'
  | '/bookshelf'
  | '/blogroll'
  | `/posts/${string}`;

export const ASK_ABOUT_ME_CONFIG = {
  pageSourcePaths: ['/curriculum-vitae', '/bookshelf', '/blogroll'] as const,
  includePosts: true,
  postExcerptChars: 400,
  rateLimit: {
    windowMs: 1000 * 60 * 60,
    maxRequests: 20,
  },
  request: {
    maxMessages: 20,
    maxCharsPerMessage: 2000,
  },
  // The model id comes from `AI_MODEL` (gateway-specific naming).
  model: {
    maxOutputTokens: 400,
    temperature: 0.2,
  },
} as const;
