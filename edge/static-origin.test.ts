// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

import type { Log } from './log';
import {
  createStaticFetch,
  isSelfOrigin,
  normalizeOrigin,
} from './static-origin';

const log: Log = {
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  child: () => log,
};

describe('normalizeOrigin', () => {
  it.each([
    ['tdeekens.b-cdn.net', 'https://tdeekens.b-cdn.net'],
    ['https://tdeekens.b-cdn.net/', 'https://tdeekens.b-cdn.net'],
    [' http://localhost:8080 ', 'http://localhost:8080'],
  ])('%s → %s', (raw, expected) => {
    expect(normalizeOrigin(raw)).toBe(expected);
  });

  it('treats empty values as unset', () => {
    expect(normalizeOrigin('')).toBeUndefined();
    expect(normalizeOrigin(undefined)).toBeUndefined();
  });
});

describe('createStaticFetch', () => {
  it('fetches from the origin without following redirects', async () => {
    const fetchImpl = vi.fn(async () => new Response('ok'));
    const fetchAsset = createStaticFetch('https://o.test', log, fetchImpl);

    const response = await fetchAsset('/index.html', 'GET');

    expect(await response.text()).toBe('ok');
    expect(fetchImpl).toHaveBeenCalledWith('https://o.test/index.html', {
      method: 'GET',
      redirect: 'manual',
    });
  });

  it('turns an origin redirect into a logged 502', async () => {
    const fetchImpl = vi.fn(
      async () =>
        new Response(null, {
          status: 308,
          headers: { Location: 'https://tdeekens.name/index.html' },
        }),
    );
    const fetchAsset = createStaticFetch('https://o.test', log, fetchImpl);

    const response = await fetchAsset('/index.html', 'GET');

    expect(response.status).toBe(502);
    expect(log.error).toHaveBeenCalledWith(
      expect.objectContaining({ location: 'https://tdeekens.name/index.html' }),
      expect.stringContaining('redirected'),
    );
  });

  it('answers 502 without an origin', async () => {
    const response = await createStaticFetch(undefined, log)('/x', 'GET');
    expect(response.status).toBe(502);
  });
});

describe('isSelfOrigin', () => {
  it('detects an origin on the serving host', () => {
    const url = new URL('https://tdeekens-site.b-cdn.net/');
    expect(isSelfOrigin('https://tdeekens-site.b-cdn.net', url)).toBe(true);
    expect(isSelfOrigin('https://tdeekens.b-cdn.net', url)).toBe(false);
    expect(isSelfOrigin(undefined, url)).toBe(false);
  });
});
