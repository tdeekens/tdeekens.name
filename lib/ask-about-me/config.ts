export type SourcePath =
  | '/curriculum-vitae'
  | '/bookshelf'
  | '/blogroll'
  | `/posts/${string}`;

export const ASK_ABOUT_ME_CONFIG = {
  pageSourcePaths: ['/curriculum-vitae', '/bookshelf', '/blogroll'] as const,
  includePosts: true,
  postExcerptChars: 400,
  contextTtlMs: 1000 * 60 * 60,
  rateLimit: {
    windowMs: 1000 * 60 * 60,
    maxRequests: 20,
  },
  request: {
    maxMessages: 20,
    maxCharsPerMessage: 2000,
  },
  model: {
    id: 'anthropic/claude-haiku-4.5' as const,
    maxOutputTokens: 400,
    temperature: 0.2,
  },
} as const;
