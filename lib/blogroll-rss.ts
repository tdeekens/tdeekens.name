import type { TBlogrollEntry } from './blogroll';

const escapeXml = (input: string): string =>
  input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeAttr = (input: string): string =>
  escapeXml(input).replace(/"/g, '&quot;');

/** RSS 2.0 feed for the blogroll, served as `/blogroll.xml`. */
export function buildBlogrollRss(
  entries: TBlogrollEntry[],
  siteUrl: string,
  now: Date = new Date(),
): string {
  const base = siteUrl.replace(/\/$/, '');
  const feedUrl = `${base}/blogroll.xml`;
  const pageUrl = `${base}/blogroll`;

  const items = entries
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

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Tobias Deekens - Blogroll</title>
    <link>${pageUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>A collection of blog posts I enjoyed reading and found worth sharing.</description>
    <language>en</language>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}
