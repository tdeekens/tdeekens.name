// @vitest-environment node
import type { CvContext } from '@lib/ask-about-me/context';
import { MockLanguageModelV4, simulateReadableStream } from 'ai/test';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createHandler, type HandlerDeps } from './handler';
import { createLog } from './log';
import type { AsyncRateLimiter } from './rate-limit';

const FILES: Record<string, { body: string; type: string }> = {
  '/index.html': { body: '<h1>Home</h1>', type: 'text/html' },
  '/index.md': { body: '# Home\n\nHello there', type: 'text/markdown' },
  '/bookshelf.html': { body: '<h1>Books</h1>', type: 'text/html' },
  '/bookshelf.md': { body: '# Books', type: 'text/markdown' },
  '/posts/foo.html': { body: '<h1>Foo</h1>', type: 'text/html' },
  '/404.html': { body: '<h1>404</h1>', type: 'text/html' },
  '/_astro/app.js': { body: 'console.log(1)', type: 'text/javascript' },
  '/me.jpg': { body: 'jpg', type: 'image/jpeg' },
};

const fetchAsset: HandlerDeps['fetchAsset'] = async (path, method) => {
  const file = FILES[path];
  return file
    ? new Response(method === 'HEAD' ? null : file.body, {
        headers: { 'Content-Type': file.type },
      })
    : new Response('missing', { status: 404 });
};

const context: CvContext = {
  combinedMarkdown: 'Tobias works at commercetools.',
  approxTokens: 8,
  builtAt: 0,
};

type StreamPart =
  Awaited<
    ReturnType<MockLanguageModelV4['doStream']>
  >['stream'] extends ReadableStream<infer Part>
    ? Part
    : never;

const chunks: StreamPart[] = [
  { type: 'text-start', id: '0' },
  { type: 'text-delta', id: '0', delta: 'He works at commercetools.' },
  { type: 'text-end', id: '0' },
  {
    type: 'finish',
    finishReason: { unified: 'stop' as const, raw: 'end_turn' },
    usage: {
      inputTokens: { total: 10, noCache: 10, cacheRead: 0, cacheWrite: 0 },
      outputTokens: { total: 5, text: 5, reasoning: 0 },
    },
  },
];

let allowed: boolean;
const limiter: AsyncRateLimiter = {
  check: async () => ({ allowed, remaining: 0, resetAt: Date.now() + 60_000 }),
};
const waitUntil = vi.fn();

const handle = createHandler({
  fetchAsset,
  isStaging: (url) => url.hostname === 'staging.example.com',
  waitUntil,
  ask: {
    context,
    limiter,
    getModel: () =>
      new MockLanguageModelV4({
        doStream: async () => ({ stream: simulateReadableStream({ chunks }) }),
      }),
    log: { ...createLog(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  },
});

const get = (path: string, headers: Record<string, string> = {}) =>
  handle(new Request(`https://www.example.com${path}`, { headers }));

const ask = (body: unknown) =>
  handle(
    new Request('https://www.example.com/api/ask-about-me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  );

const question = {
  variant: 'general',
  messages: [
    {
      id: 'u1',
      role: 'user',
      parts: [{ type: 'text', text: 'Where does he work?' }],
    },
  ],
};

beforeEach(() => {
  allowed = true;
  waitUntil.mockClear();
});

describe('pages', () => {
  it('serves clean URLs from the built .html files', async () => {
    const response = await get('/bookshelf');
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe(
      'text/html; charset=utf-8',
    );
    expect(response.headers.get('vary')).toBe('Accept');
    expect(await response.text()).toBe('<h1>Books</h1>');
  });

  it('serves the home page with the Link header', async () => {
    const response = await get('/');
    expect(await response.text()).toBe('<h1>Home</h1>');
    expect(response.headers.get('link')).toContain('</sitemap.xml>');
  });

  it('serves nested pages', async () => {
    expect(await (await get('/posts/foo')).text()).toBe('<h1>Foo</h1>');
  });

  it('answers unknown pages with the 404 page', async () => {
    const response = await get('/nope');
    expect(response.status).toBe(404);
    expect(await response.text()).toBe('<h1>404</h1>');
  });

  it('hides the built file names', async () => {
    expect((await get('/bookshelf.html')).status).toBe(404);
    expect((await get('/bookshelf.md')).status).toBe(404);
  });

  it('rejects writes to pages', async () => {
    const response = await handle(
      new Request('https://www.example.com/bookshelf', { method: 'POST' }),
    );
    expect(response.status).toBe(405);
  });
});

describe('redirects', () => {
  it.each([
    ['/bookshelf/', 308, '/bookshelf'],
    ['/posts/foo/?a=1', 308, '/posts/foo?a=1'],
    ['/cv', 308, '/curriculum-vitae'],
    ['/posts', 307, '/'],
  ])('%s → %i %s', async (path, status, location) => {
    const response = await get(path);
    expect(response.status).toBe(status);
    expect(response.headers.get('location')).toBe(location);
  });
});

describe('markdown negotiation', () => {
  it('serves markdown for Accept: text/markdown', async () => {
    const response = await get('/', { accept: 'text/markdown, text/html' });
    expect(response.headers.get('content-type')).toBe(
      'text/markdown; charset=utf-8',
    );
    expect(response.headers.get('x-markdown-tokens')).toBe('4');
    expect(response.headers.get('vary')).toBe('Accept');
    expect(await response.text()).toBe('# Home\n\nHello there');
  });

  it('falls back to HTML when a page has no markdown', async () => {
    const response = await get('/posts/foo', { accept: 'text/markdown' });
    expect(await response.text()).toBe('<h1>Foo</h1>');
  });

  it('serves HTML to browsers', async () => {
    const response = await get('/bookshelf', { accept: 'text/html' });
    expect(await response.text()).toBe('<h1>Books</h1>');
  });
});

describe('assets', () => {
  it('caches hashed build assets forever', async () => {
    const response = await get('/_astro/app.js');
    expect(response.headers.get('cache-control')).toContain('immutable');
  });

  it('serves public files with a shorter cache', async () => {
    const response = await get('/me.jpg');
    expect(response.headers.get('content-type')).toBe('image/jpeg');
    expect(response.headers.get('cache-control')).toBe('public, max-age=86400');
  });

  it('404s missing files', async () => {
    expect((await get('/missing.png')).status).toBe(404);
  });
});

describe('staging', () => {
  it('marks every response noindex', async () => {
    const response = await handle(
      new Request('https://staging.example.com/bookshelf'),
    );
    expect(response.headers.get('x-robots-tag')).toBe('noindex, nofollow');
  });

  it('leaves production indexable', async () => {
    expect((await get('/bookshelf')).headers.get('x-robots-tag')).toBeNull();
  });
});

describe('/api/ask-about-me', () => {
  it('streams an answer and keeps the runtime alive until done', async () => {
    const response = await ask(question);
    expect(response.status).toBe(200);
    expect(response.headers.get('x-context-tokens')).toBe('8');
    expect(await response.text()).toContain('He works at commercetools.');
    expect(waitUntil).toHaveBeenCalledTimes(1);
    await expect(waitUntil.mock.calls[0][0]).resolves.toBe('finished');
  });

  it('rejects GET', async () => {
    const response = await get('/api/ask-about-me');
    expect(response.status).toBe(405);
    expect(response.headers.get('allow')).toBe('POST');
  });

  it('rejects malformed bodies', async () => {
    expect((await ask('not json')).status).toBe(400);
    expect((await ask({ messages: [] })).status).toBe(400);
  });

  it('rate limits with Retry-After', async () => {
    allowed = false;
    const response = await ask(question);
    expect(response.status).toBe(429);
    expect(Number(response.headers.get('retry-after'))).toBeGreaterThan(0);
  });

  it('404s other API paths', async () => {
    expect((await get('/api/accept-md')).status).toBe(404);
  });
});
