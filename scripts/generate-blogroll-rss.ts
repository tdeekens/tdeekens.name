#!/usr/bin/env tsx
import { writeFileSync } from 'node:fs';

import { blogroll } from '../lib/blogroll';

const siteUrl = (process.env.SITE_URL || 'https://www.tdeekens.name').replace(
  /\/$/,
  '',
);
const feedUrl = `${siteUrl}/blogroll.xml`;
const pageUrl = `${siteUrl}/blogroll`;
const buildDate = new Date().toUTCString();

const escapeXml = (input: string): string =>
  input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeAttr = (input: string): string =>
  escapeXml(input).replace(/"/g, '&quot;');

const items = blogroll
  .map((entry) => {
    const pubDate = new Date(entry.addedAt).toUTCString();
    const tags = entry.tags ?? [];
    const categories = tags.length
      ? '\n' +
        tags
          .map((tag) => `      <category>${escapeXml(tag)}</category>`)
          .join('\n')
      : '';
    return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeAttr(entry.href)}</link>
      <guid isPermaLink="true">${escapeAttr(entry.href)}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(entry.author)}</dc:creator>
      <description>${escapeXml(entry.teaser)}</description>${categories}
    </item>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Tobias Deekens - Blogroll</title>
    <link>${pageUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>A collection of blog posts I enjoyed reading and found worth sharing.</description>
    <language>en</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

writeFileSync('public/blogroll.xml', xml);
console.error(`wrote public/blogroll.xml (${blogroll.length} items)`);
