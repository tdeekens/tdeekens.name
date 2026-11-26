#!/usr/bin/env tsx
/**
 * Runs after `astro build` and writes everything the static site and the edge
 * handler need besides the HTML:
 *
 * - `dist/<page>.md` for every page (served for `Accept: text/markdown`)
 * - `edge/generated/context.json` (the ask-about-me context)
 * - `dist/sitemap.xml`, `dist/robots.txt`, `dist/blogroll.xml`
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

import { htmlToMarkdown } from 'accept-md-runtime';

import { ASK_ABOUT_ME_CONFIG } from '../lib/ask-about-me/config';
import {
  buildCvContext,
  postSources,
  titleFromPath,
} from '../lib/ask-about-me/context';
import { blogroll } from '../lib/blogroll';
import { buildBlogrollRss } from '../lib/blogroll-rss';
import { getAllPosts, getPublishedPosts } from '../lib/posts';

const DIST = 'dist';
const SITE_URL = (process.env.SITE_URL || 'https://www.tdeekens.name').replace(
  /\/$/,
  '',
);
// Same rules the site used with accept-md on Vercel.
const CLEAN_SELECTORS = [
  'nav',
  'footer',
  '.no-markdown',
  '[data-no-markdown]',
  'astro-island > template',
  // Shortcuts help and page controls are interactive chrome, not content.
  'dialog',
  '[data-page-controls]',
];

type TPost = {
  slug: string;
  title?: string;
  content: string;
  draft: boolean;
  updatedAt: string;
};

const listHtml = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name === '_astro' ? [] : listHtml(path);
    }
    return entry.name.endsWith('.html') ? [path] : [];
  });

/** `dist/posts/foo.html` → `/posts/foo`, `dist/index.html` → `/`. */
const routeOf = (file: string): string => {
  const route = '/' + relative(DIST, file).replace(/\.html$/, '');
  return route === '/index' ? '/' : route;
};

function writeMarkdown(pages: string[]): Map<string, string> {
  const markdownByRoute = new Map<string, string>();
  for (const file of pages) {
    const markdown = htmlToMarkdown(readFileSync(file, 'utf8'), {
      cleanSelectors: CLEAN_SELECTORS,
    });
    writeFileSync(file.replace(/\.html$/, '.md'), markdown);
    markdownByRoute.set(routeOf(file), markdown);
  }
  return markdownByRoute;
}

function writeContext(markdownByRoute: Map<string, string>) {
  const pageSources = ASK_ABOUT_ME_CONFIG.pageSourcePaths.map((path) => {
    const markdown = markdownByRoute.get(path);
    if (!markdown) {
      throw new Error(`No markdown for context page ${path}`);
    }
    return { path, title: titleFromPath(path), markdown };
  });
  const posts = postSources(getPublishedPosts() as TPost[]);
  const context = buildCvContext(pageSources, posts);
  const out = 'edge/generated/context.json';
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(context) + '\n');
  return context;
}

function writeSitemap(routes: string[]) {
  const posts = getAllPosts() as TPost[];
  const drafts = new Set(
    posts.filter((post) => post.draft).map((post) => `/posts/${post.slug}`),
  );
  const now = new Date().toISOString();
  const urls = routes
    .filter((route) => !drafts.has(route))
    .toSorted((a, b) => a.localeCompare(b))
    .map((route) => {
      const post = posts.find((p) => `/posts/${p.slug}` === route);
      const loc = route === '/' ? SITE_URL : `${SITE_URL}${route}`;
      return `<url><loc>${loc}</loc><lastmod>${post ? post.updatedAt : now}</lastmod><changefreq>${post ? 'monthly' : 'weekly'}</changefreq><priority>${route === '/' ? 1 : 0.7}</priority></url>`;
    });
  writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.join('\n')}
</urlset>
`,
  );
  return urls.length;
}

function writeRobots() {
  writeFileSync(
    join(DIST, 'robots.txt'),
    `# *
User-agent: *
Content-Signal: ai-train=no, search=yes, ai-input=no
Allow: /

# Host
Host: ${SITE_URL}

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
`,
  );
}

function main() {
  const pages = listHtml(DIST).filter((file) => routeOf(file) !== '/404');
  const markdownByRoute = writeMarkdown(pages);
  const context = writeContext(markdownByRoute);
  const sitemapUrls = writeSitemap([...markdownByRoute.keys()]);
  writeRobots();
  writeFileSync(
    join(DIST, 'blogroll.xml'),
    buildBlogrollRss(blogroll, SITE_URL),
  );

  console.error(
    `postbuild: ${markdownByRoute.size} markdown pages, context ~${context.approxTokens} tokens, ${sitemapUrls} sitemap urls, ${blogroll.length} feed items`,
  );
}

main();
