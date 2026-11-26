import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import type { LanguageModel } from 'ai';

export type AiEnv = {
  /**
   * `anthropic` (default) speaks the Anthropic Messages API, which keeps
   * prompt caching; `openai-compatible` covers gateways like OpenRouter.
   */
  AI_PROVIDER?: string;
  /** Gateway endpoint, e.g. Eden AI's EU Anthropic-compatible base URL. */
  AI_BASE_URL?: string;
  AI_API_KEY?: string;
  /** Gateway-specific model id, e.g. `anthropic/claude-haiku-5-5` on Eden. */
  AI_MODEL?: string;
  /**
   * `bearer` sends the key as `Authorization: Bearer` (gateways such as Eden
   * AI); otherwise the Anthropic default `x-api-key` header is used.
   */
  AI_AUTH?: string;
};

export class AiConfigError extends Error {}

/** Resolves the model from env so switching gateways is config, not code. */
export function createModel(env: AiEnv): LanguageModel {
  if (!env.AI_API_KEY || !env.AI_MODEL) {
    throw new AiConfigError('AI_API_KEY and AI_MODEL must be set');
  }

  if (env.AI_PROVIDER === 'openai-compatible') {
    if (!env.AI_BASE_URL) {
      throw new AiConfigError('AI_BASE_URL is required for openai-compatible');
    }
    return createOpenAICompatible({
      name: 'gateway',
      baseURL: env.AI_BASE_URL,
      apiKey: env.AI_API_KEY,
    })(env.AI_MODEL);
  }

  return createAnthropic({
    ...(env.AI_AUTH === 'bearer'
      ? { authToken: env.AI_API_KEY }
      : { apiKey: env.AI_API_KEY }),
    ...(env.AI_BASE_URL ? { baseURL: env.AI_BASE_URL } : {}),
  })(env.AI_MODEL);
}
