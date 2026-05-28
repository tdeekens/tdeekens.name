#!/usr/bin/env node
// One-off: derive addedAt per blogroll entry by walking git history.
// Outputs JSON map { [href]: isoDate } to stdout.

const { execSync } = require('node:child_process');

const FILE = 'pages/blogroll.tsx';

const log = execSync(`git log --reverse --format='%H|%aI' -- ${FILE}`, {
  encoding: 'utf8',
})
  .trim()
  .split('\n');

const extractHrefs = (content) => {
  const re = /href="([^"]+)"/g;
  const out = new Set();
  let m;
  while ((m = re.exec(content))) out.add(m[1]);
  return out;
};

const firstSeen = new Map();
let prev = new Set();

for (const line of log) {
  const [sha, date] = line.split('|');
  const content = execSync(`git show ${sha}:${FILE}`, { encoding: 'utf8' });
  const hrefs = extractHrefs(content);
  for (const href of hrefs) {
    if (!prev.has(href) && !firstSeen.has(href)) {
      firstSeen.set(href, date);
    }
  }
  prev = hrefs;
}

const out = Object.fromEntries(firstSeen);
process.stdout.write(JSON.stringify(out, null, 2));
