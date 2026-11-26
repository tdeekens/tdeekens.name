#!/usr/bin/env tsx
/**
 * Serves `dist/` through the real edge handler on http://localhost:4322, so
 * redirects, markdown negotiation and the chat behave like on the edge.
 * Reads AI_* env vars for the chat; without them it answers 503.
 *
 *   pnpm build && pnpm serve:local
 */
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { Readable } from 'node:stream';

import { createHandler } from '../edge/handler';
import { createLog } from '../edge/log';
import { createModel } from '../edge/model';
import { inMemoryRateLimiter } from '../edge/rate-limit';
import { ASK_ABOUT_ME_CONFIG } from '../lib/ask-about-me/config';
import type { CvContext } from '../lib/ask-about-me/context';

const PORT = Number(process.env.PORT ?? 4322);
const DIST = 'dist';

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

async function main() {
  const context = JSON.parse(
    await readFile('edge/generated/context.json', 'utf8'),
  ) as CvContext;

  const handle = createHandler({
    fetchAsset: async (path, method) => {
      const file = normalize(join(DIST, decodeURIComponent(path)));
      if (!file.startsWith(DIST)) {
        return new Response(null, { status: 404 });
      }
      try {
        const body = await readFile(file);
        return new Response(method === 'HEAD' ? null : body, {
          headers: {
            'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
          },
        });
      } catch {
        return new Response(null, { status: 404 });
      }
    },
    isStaging: () => process.env.STAGING === '1',
    ask: {
      context,
      limiter: inMemoryRateLimiter(ASK_ABOUT_ME_CONFIG.rateLimit),
      getModel: () =>
        createModel({
          AI_PROVIDER: process.env.AI_PROVIDER,
          AI_BASE_URL: process.env.AI_BASE_URL,
          AI_API_KEY: process.env.AI_API_KEY,
          AI_MODEL: process.env.AI_MODEL,
          AI_AUTH: process.env.AI_AUTH,
        }),
      log: createLog({ host: 'local' }),
    },
  });

  createServer(async (req, res) => {
    const controller = new AbortController();
    res.on('close', () => controller.abort());
    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
    const request = new Request(`http://localhost:${PORT}${req.url}`, {
      method: req.method,
      headers: Object.entries(req.headers).flatMap(([key, value]) =>
        value === undefined
          ? []
          : (Array.isArray(value) ? value : [value]).map(
              (v) => [key, v] as [string, string],
            ),
      ),
      body: hasBody ? (Readable.toWeb(req) as ReadableStream) : undefined,
      duplex: hasBody ? 'half' : undefined,
      signal: controller.signal,
    } as RequestInit);

    const response = await handle(request);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    if (response.body) {
      Readable.fromWeb(response.body as never).pipe(res);
    } else {
      res.end();
    }
  }).listen(PORT, () => {
    console.error(`serving dist/ via edge handler on http://localhost:${PORT}`);
  });
}

void main();
