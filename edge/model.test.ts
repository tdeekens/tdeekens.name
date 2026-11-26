// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

import { AiConfigError, createModel } from './model';

const prompt = [
  { role: 'user' as const, content: [{ type: 'text' as const, text: 'hi' }] },
];

/** Captures the outgoing request of one generation call. */
async function captureRequest(env: Parameters<typeof createModel>[0]) {
  const fetchSpy = vi
    .spyOn(globalThis, 'fetch')
    .mockResolvedValue(new Response('{}', { status: 500 }));
  const model = createModel(env);
  if (typeof model === 'string') {
    throw new Error('expected a model instance');
  }
  // The mocked 500 makes the call fail; only the request matters here.
  await Promise.resolve(model.doGenerate({ prompt })).catch(() => undefined);
  const [url, init] = fetchSpy.mock.calls[0];
  fetchSpy.mockRestore();
  return { url: String(url), headers: new Headers(init?.headers) };
}

describe('createModel', () => {
  it('requires a key and a model', () => {
    expect(() => createModel({})).toThrow(AiConfigError);
  });

  it('talks to Eden with a bearer token on the EU endpoint', async () => {
    const { url, headers } = await captureRequest({
      AI_BASE_URL: 'https://api.eu.edenai.run/v3/v1',
      AI_API_KEY: 'secret',
      AI_MODEL: 'anthropic/claude-haiku-5-5',
      AI_AUTH: 'bearer',
    });
    expect(url).toBe('https://api.eu.edenai.run/v3/v1/messages');
    expect(headers.get('authorization')).toBe('Bearer secret');
    expect(headers.get('x-api-key')).toBeNull();
  });

  it('uses x-api-key for Anthropic directly', async () => {
    const { url, headers } = await captureRequest({
      AI_API_KEY: 'secret',
      AI_MODEL: 'claude-haiku-5-5',
    });
    expect(url).toBe('https://api.anthropic.com/v1/messages');
    expect(headers.get('x-api-key')).toBe('secret');
  });
});
