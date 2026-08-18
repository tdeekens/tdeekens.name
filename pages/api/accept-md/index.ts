import { getMarkdownForPath, loadConfig } from 'accept-md-runtime';
import type { NextApiRequest, NextApiResponse } from 'next';

const cache = new Map();

const firstHeaderValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const normalizePath = (value: string | string[] | undefined) => {
  const rawPath = firstHeaderValue(value) || '/';
  const path = rawPath === '' || rawPath.includes(':path') ? '/' : rawPath;

  return path.startsWith('/') ? path : `/${path}`;
};

const getBaseUrl = (
  req: NextApiRequest,
  configuredBaseUrl: string | undefined,
) => {
  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  const host = req.headers.host;

  if (host) {
    const protocol =
      firstHeaderValue(req.headers['x-forwarded-proto']) ||
      (process.env.VERCEL_URL ? 'https' : 'http');

    return `${protocol}://${host}`;
  }

  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL.startsWith('http')
      ? process.env.VERCEL_URL
      : `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT || 3000}`;
};

const getForwardHeaders = (req: NextApiRequest) => {
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (!value || key.toLowerCase() === 'accept') {
      continue;
    }

    headers.set(key, firstHeaderValue(value) || '');
  }

  return headers;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    res.status(405).end();

    return;
  }

  const pathFromHeader = req.headers['x-accept-md-path'];
  const pathFromQuery = Array.isArray(req.query.path)
    ? req.query.path[0]
    : req.query.path;
  const pathFromMatchedHeader =
    req.headers['x-matched-path'] ||
    req.headers['x-vercel-original-path'] ||
    req.headers['x-original-path'] ||
    req.headers['x-rewrite-path'];
  const pathname = normalizePath(
    pathFromHeader || pathFromQuery || pathFromMatchedHeader,
  );

  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    res.status(404).json({ error: 'Not found' });

    return;
  }

  const config = loadConfig(process.cwd());

  try {
    const markdown = await getMarkdownForPath({
      pathname,
      baseUrl: getBaseUrl(req, config.baseUrl),
      config,
      cache: config.cache === false ? undefined : cache,
      headers: getForwardHeaders(req),
    });

    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Vary', 'Accept');
    res.setHeader(
      'X-Markdown-Tokens',
      String(markdown.split(/\s+/).filter(Boolean).length),
    );

    if (config.cache) {
      res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate',
      );
    }

    if (req.method === 'HEAD') {
      res.status(200).end();

      return;
    }

    res.status(200).send(markdown);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'Markdown generation failed',
    });
  }
}
