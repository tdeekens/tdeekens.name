#!/usr/bin/env node
// One-off: parse pages/blogroll.tsx into lib/blogroll.ts (typed array).
// Merges per-entry addedAt from .local/tmp/blogroll-dates.json.

const fs = require('node:fs');

const SRC = 'pages/blogroll.tsx';
const DATES = '.local/tmp/blogroll-dates.json';
const OUT = 'lib/blogroll.ts';

const source = fs.readFileSync(SRC, 'utf8');
const dates = JSON.parse(fs.readFileSync(DATES, 'utf8'));

const re =
  /<BlogrollEntry\s+title="((?:[^"\\]|\\.)*)"\s+href="((?:[^"\\]|\\.)*)"\s+author="((?:[^"\\]|\\.)*)"\s+teaser="((?:[^"\\]|\\.)*)"(?:\s+tags=\{(\[[^\]]*\])\})?\s*\/>/g;

const entries = [];
let m;
while ((m = re.exec(source))) {
  const [, title, href, author, teaser, tagsLiteral] = m;
  let tags;
  if (tagsLiteral) {
    tags = Array.from(tagsLiteral.matchAll(/'([^']+)'/g)).map((x) => x[1]);
  }
  const addedAt = dates[href];
  if (!addedAt) {
    console.error('missing date for', href);
    process.exit(1);
  }
  entries.push({ title, href, author, teaser, tags, addedAt });
}

entries.sort((a, b) => (a.addedAt < b.addedAt ? 1 : -1));

const fmt = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const body = entries
  .map((e) => {
    const tagsLine = e.tags
      ? `    tags: [${e.tags.map((t) => `'${t}'`).join(', ')}],\n`
      : '';
    return `  {
    title: '${fmt(e.title)}',
    href: '${fmt(e.href)}',
    author: '${fmt(e.author)}',
    teaser: '${fmt(e.teaser)}',
${tagsLine}    addedAt: '${e.addedAt}',
  },`;
  })
  .join('\n');

const out = `export type TBlogrollEntry = {
  title: string;
  href: string;
  author: string;
  teaser: string;
  tags?: string[];
  addedAt: string;
};

export const blogroll: TBlogrollEntry[] = [
${body}
];
`;

fs.writeFileSync(OUT, out);
console.error(`wrote ${entries.length} entries to ${OUT}`);
