import type { UIMessage } from 'ai';

export type AskRequestBody = {
  messages: UIMessage[];
};

export type AskErrorCode =
  | 'method_not_allowed'
  | 'invalid_body'
  | 'rate_limited'
  | 'context_unavailable'
  | 'upstream_failed';

export type AskErrorResponse = {
  error: AskErrorCode;
  message: string;
  retryAfterSeconds?: number;
};
