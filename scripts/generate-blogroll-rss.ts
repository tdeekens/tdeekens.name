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
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const items = blogroll
  .map((entry) => {
    const pubDate = new Date(entry.addedAt).toUTCString();
    const categories = (entry.tags ?? [])
      .map((tag) => `      <category>${escapeXml(tag)}</category>`)
      .join('\n');
    return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(entry.href)}</link>
      <guid isPermaLink="true">${escapeXml(entry.href)}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(entry.author)}</author>
      <description>${escapeXml(entry.teaser)}</description>
${categories}
    </item>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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
