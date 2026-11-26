import type { HandlerDeps } from './handler';
import type { Log } from './log';

/**
 * Normalizes `STATIC_ORIGIN`: adds a missing `https://` and drops a trailing
 * slash. Returns `undefined` for an empty value.
 */
export function normalizeOrigin(raw: string | undefined): string | undefined {
  const value = raw?.trim().replace(/\/+$/, '');
  if (!value) {
    return undefined;
  }
  return /^https?:\/\//.test(value) ? value : `https://${value}`;
}

/**
 * `fetchAsset` against the storage pull zone, guarded against the setup
 * mistakes that otherwise fail silently:
 *
 * - redirects are not followed (they would proxy whatever the redirect points
 *   at, e.g. the old site) and answer 502 with a logged error;
 * - an origin on the script's own host would loop and answers 508.
 */
export function createStaticFetch(
  origin: string | undefined,
  log: Log,
  fetchImpl: typeof fetch = fetch,
): HandlerDeps['fetchAsset'] {
  return async (path, method) => {
    if (!origin) {
      log.error({}, 'STATIC_ORIGIN is not set');
      return new Response('Static origin not configured', { status: 502 });
    }
    const response = await fetchImpl(`${origin}${path}`, {
      method,
      redirect: 'manual',
    });
    if (response.status >= 300 && response.status < 400) {
      log.error(
        {
          path,
          status: response.status,
          location: response.headers.get('location'),
        },
        'static origin redirected; STATIC_ORIGIN must be the storage pull zone',
      );
      return new Response('Static origin misconfigured', { status: 502 });
    }
    return response;
  };
}

/** True when `STATIC_ORIGIN` points at the host the script itself serves. */
export const isSelfOrigin = (origin: string | undefined, url: URL) =>
  origin !== undefined && new URL(origin).hostname === url.hostname;
