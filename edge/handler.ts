import { handleAsk, type AskDeps } from './ask-about-me';

/**
 * Host-neutral request handler for the static site plus its two dynamic
 * routes. Hosts (Bunny Edge Scripting, Cloudflare Workers) only provide
 * `fetchAsset` and runtime hooks; everything else lives here.
 */
export type HandlerDeps = {
  /** Fetches a built file, e.g. `/bookshelf.html`, from storage. */
  fetchAsset: (path: string, method: 'GET' | 'HEAD') => Promise<Response>;
  ask: AskDeps;
  /** True for hosts that must not be indexed, e.g. the `*.b-cdn.net` one. */
  isNoIndex: (url: URL) => boolean;
  /** Keeps the runtime alive until a streamed response has finished. */
  waitUntil?: (promise: Promise<unknown>) => void;
};

const REDIRECTS: Record<string, { to: string; status: 307 | 308 }> = {
  '/cv': { to: '/curriculum-vitae', status: 308 },
  '/posts': { to: '/', status: 307 },
};

const HOME_LINK =
  '</sitemap.xml>; rel="index"; type="application/xml", </robots.txt>; rel="service-meta"; type="text/plain"';

const MARKDOWN_ACCEPT = /\btext\/markdown\b/i;

const CACHE = {
  page: 'public, max-age=0, must-revalidate',
  immutable: 'public, max-age=31536000, immutable',
  asset: 'public, max-age=86400',
} as const;

const hasExtension = (path: string) => /\/[^/]*\.[^/]+$/.test(path);

/** `/` → `/index`, `/bookshelf` → `/bookshelf`. */
const pageBase = (path: string) => (path === '/' ? '/index' : path);

const redirect = (location: string, status: number) =>
  new Response(null, { status, headers: { Location: location } });

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

/** Re-wraps a body so `waitUntil` resolves once it is fully sent or aborted. */
function keepAliveUntilDone(
  response: Response,
  waitUntil: HandlerDeps['waitUntil'],
): Response {
  if (!waitUntil || !response.body) {
    return response;
  }
  const { readable, writable } = new TransformStream();
  // A client disconnect aborts the pipe; that still counts as "done".
  const done = response.body.pipeTo(writable).then(
    () => 'finished' as const,
    () => 'aborted' as const,
  );
  waitUntil(done);
  return new Response(readable, response);
}

export function createHandler(deps: HandlerDeps) {
  const withCommonHeaders = (
    response: Response,
    url: URL,
    extra: Record<string, string> = {},
  ): Response => {
    const headers = new Headers(response.headers);
    for (const [key, value] of Object.entries(extra)) {
      headers.set(key, value);
    }
    headers.set('Vary', 'Accept');
    if (url.pathname === '/') {
      headers.set('Link', HOME_LINK);
    }
    if (deps.isNoIndex(url)) {
      headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  };

  const notFound = async (url: URL, method: 'GET' | 'HEAD') => {
    const page = await deps.fetchAsset('/404.html', method);
    return withCommonHeaders(
      new Response(page.ok ? page.body : 'Not found', {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }),
      url,
      { 'Cache-Control': CACHE.page },
    );
  };

  return async function handle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path.length > 1 && path.endsWith('/')) {
      return redirect(`${path.replace(/\/+$/, '') || '/'}${url.search}`, 308);
    }

    const target = REDIRECTS[path];
    if (target) {
      return withCommonHeaders(redirect(target.to, target.status), url);
    }

    if (path === '/api/ask-about-me') {
      const response = await handleAsk(request, deps.ask);
      return withCommonHeaders(
        keepAliveUntilDone(response, deps.waitUntil),
        url,
      );
    }
    if (path.startsWith('/api/')) {
      return withCommonHeaders(
        Response.json({ error: 'Not found' }, { status: 404 }),
        url,
      );
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response(null, {
        status: 405,
        headers: { Allow: 'GET, HEAD' },
      });
    }
    const method = request.method;

    // Built `.html`/`.md` files are only reachable through their clean URL.
    if (/\.(html|md)$/.test(path)) {
      return notFound(url, method);
    }

    if (!hasExtension(path)) {
      if (MARKDOWN_ACCEPT.test(request.headers.get('accept') ?? '')) {
        const markdown = await deps.fetchAsset(`${pageBase(path)}.md`, 'GET');
        if (markdown.ok) {
          const text = await markdown.text();
          return withCommonHeaders(
            new Response(method === 'HEAD' ? null : text, { status: 200 }),
            url,
            {
              'Content-Type': 'text/markdown; charset=utf-8',
              'X-Markdown-Tokens': String(countWords(text)),
              'Cache-Control': CACHE.page,
            },
          );
        }
      }

      const page = await deps.fetchAsset(`${pageBase(path)}.html`, method);
      if (!page.ok) {
        return notFound(url, method);
      }
      return withCommonHeaders(page, url, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': CACHE.page,
      });
    }

    const asset = await deps.fetchAsset(path, method);
    if (asset.status === 404) {
      return notFound(url, method);
    }
    return withCommonHeaders(asset, url, {
      'Cache-Control': path.startsWith('/_astro/')
        ? CACHE.immutable
        : CACHE.asset,
    });
  };
}
