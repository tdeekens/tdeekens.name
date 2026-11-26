#!/usr/bin/env tsx
/**
 * Captures the observable behaviour of a deployment (status codes, redirects,
 * headers, titles, markdown negotiation, feeds) so two deployments can be
 * compared before a cutover.
 *
 *   pnpm parity snapshot https://www.tdeekens.name parity/production.json
 *   pnpm parity snapshot https://staging.tdeekens.name parity/staging.json
 *   pnpm parity diff parity/production.json parity/staging.json
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

type TProbe = {
  status: number;
  location?: string;
  contentType?: string;
  vary?: string;
  link?: string;
  robotsTag?: string;
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  markdownWords?: number;
  markdownStart?: string;
};

type TSnapshot = {
  baseUrl: string;
  takenAt: string;
  sitemapUrls: string[];
  robotsTxt: string;
  blogrollItems: number;
  html: Record<string, TProbe>;
  markdown: Record<string, TProbe>;
};

const EXTRA_PATHS = [
  '/cv',
  '/bookshelf/',
  '/posts/a-post-about-bitcoins/',
  '/this-page-does-not-exist',
  '/api/ask-about-me',
];

const attr = (html: string, pattern: RegExp) =>
  html.match(pattern)?.[1]?.trim();

const decode = (value: string | undefined) =>
  value
    ?.replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const normalizeMarkdown = (markdown: string) =>
  markdown.replace(/\s+/g, ' ').trim();

const toPath = (url: string, baseUrl: string) => {
  const parsed = new URL(url);
  return parsed.pathname + parsed.search || new URL(baseUrl).pathname;
};

async function probe(
  baseUrl: string,
  path: string,
  accept?: string,
): Promise<TProbe> {
  const response = await fetch(new URL(path, baseUrl), {
    redirect: 'manual',
    headers: accept ? { accept } : {},
  });
  const body = await response.text();
  const result: TProbe = {
    status: response.status,
    location: response.headers.get('location') ?? undefined,
    contentType: response.headers.get('content-type') ?? undefined,
    vary: response.headers.get('vary') ?? undefined,
    link: response.headers.get('link') ?? undefined,
    robotsTag: response.headers.get('x-robots-tag') ?? undefined,
  };

  if (result.contentType?.includes('text/html')) {
    result.title = decode(attr(body, /<title[^>]*>([^<]*)<\/title>/i));
    result.description = decode(
      attr(body, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i),
    );
    result.canonical = attr(
      body,
      /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i,
    );
    result.ogTitle = decode(
      attr(body, /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i),
    );
  }

  if (result.contentType?.includes('text/markdown')) {
    const normalized = normalizeMarkdown(body);
    result.markdownWords = normalized.split(' ').filter(Boolean).length;
    result.markdownStart = normalized.slice(0, 120);
  }

  return result;
}

async function snapshot(baseUrl: string): Promise<TSnapshot> {
  const sitemap = await (await fetch(new URL('/sitemap.xml', baseUrl))).text();
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => toPath(match[1], baseUrl))
    .sort();
  const robotsTxt = await (await fetch(new URL('/robots.txt', baseUrl))).text();
  const blogroll = await (
    await fetch(new URL('/blogroll.xml', baseUrl))
  ).text();

  const html: Record<string, TProbe> = {};
  const markdown: Record<string, TProbe> = {};
  for (const path of [...sitemapUrls, ...EXTRA_PATHS]) {
    html[path] = await probe(baseUrl, path);
  }
  for (const path of sitemapUrls) {
    markdown[path] = await probe(baseUrl, path, 'text/markdown');
  }

  return {
    baseUrl,
    takenAt: new Date().toISOString(),
    sitemapUrls,
    robotsTxt: robotsTxt.trim(),
    blogrollItems: (blogroll.match(/<item>/g) ?? []).length,
    html,
    markdown,
  };
}

// Fields that legitimately differ between hosts, or are only roughly comparable.
const IGNORED = new Set(['markdownStart']);

function diff(a: TSnapshot, b: TSnapshot): string[] {
  const problems: string[] = [];
  const normalizeHost = (value: unknown) =>
    typeof value === 'string'
      ? value.replaceAll(a.baseUrl, '').replaceAll(b.baseUrl, '')
      : value;

  const compare = (label: string, x: unknown, y: unknown) => {
    if (JSON.stringify(normalizeHost(x)) !== JSON.stringify(normalizeHost(y))) {
      problems.push(`${label}: ${JSON.stringify(x)} → ${JSON.stringify(y)}`);
    }
  };

  compare('sitemap urls', a.sitemapUrls, b.sitemapUrls);
  compare('robots.txt', a.robotsTxt, b.robotsTxt);
  compare('blogroll items', a.blogrollItems, b.blogrollItems);

  for (const kind of ['html', 'markdown'] as const) {
    for (const path of Object.keys(a[kind])) {
      const left = a[kind][path];
      const right = b[kind][path];
      if (!right) {
        problems.push(`${kind} ${path}: missing in second snapshot`);
        continue;
      }
      for (const key of Object.keys({
        ...left,
        ...right,
      }) as (keyof TProbe)[]) {
        if (IGNORED.has(key)) {
          continue;
        }
        if (key === 'markdownWords') {
          const l = left.markdownWords ?? 0;
          const r = right.markdownWords ?? 0;
          // Different HTML→markdown converters; flag only real content loss.
          if (Math.abs(l - r) > Math.max(20, l * 0.1)) {
            problems.push(`${kind} ${path} markdownWords: ${l} → ${r}`);
          }
          continue;
        }
        compare(`${kind} ${path} ${key}`, left[key], right[key]);
      }
    }
  }
  return problems;
}

async function main() {
  const [command, first, second] = process.argv.slice(2);

  if (command === 'snapshot' && first && second) {
    const result = await snapshot(first);
    mkdirSync(dirname(second), { recursive: true });
    writeFileSync(second, JSON.stringify(result, null, 2) + '\n');
    console.error(
      `wrote ${second} (${result.sitemapUrls.length} sitemap urls, ${Object.keys(result.html).length} html probes)`,
    );
  } else if (command === 'diff' && first && second) {
    const problems = diff(
      JSON.parse(readFileSync(first, 'utf8')),
      JSON.parse(readFileSync(second, 'utf8')),
    );
    if (problems.length) {
      console.log(problems.join('\n'));
      process.exitCode = 1;
    } else {
      console.log('no differences');
    }
  } else {
    console.error(
      'usage: parity snapshot <baseUrl> <out.json> | parity diff <a.json> <b.json>',
    );
    process.exitCode = 2;
  }
}

void main();
