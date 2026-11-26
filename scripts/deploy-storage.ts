#!/usr/bin/env tsx
/**
 * Uploads `dist/` to a Bunny Storage zone. Hashed build assets go first and
 * pages last, so a new page never references an asset that is not there yet.
 * Old files are kept: cached pages may still point at previous asset hashes.
 *
 * Env: BUNNY_STORAGE_ZONE, BUNNY_STORAGE_PASSWORD,
 *      BUNNY_STORAGE_HOST (default storage.bunnycdn.com, i.e. Frankfurt)
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const CONCURRENCY = 8;

const zone = process.env.BUNNY_STORAGE_ZONE;
const password = process.env.BUNNY_STORAGE_PASSWORD;
// `||`, not `??`: GitHub passes an unset variable as an empty string.
const host = process.env.BUNNY_STORAGE_HOST || 'storage.bunnycdn.com';

const listFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });

/** Assets before pages, so pages only go live once their assets are there. */
const rank = (path: string) => (/\.(html|md|xml|txt)$/.test(path) ? 1 : 0);

async function upload(file: string) {
  const key = relative(DIST, file).split('\\').join('/');
  const response = await fetch(
    `https://${host}/${zone}/${key.split('/').map(encodeURIComponent).join('/')}`,
    {
      method: 'PUT',
      headers: {
        AccessKey: password as string,
        'Content-Type': 'application/octet-stream',
      },
      body: readFileSync(file),
    },
  );
  if (!response.ok) {
    throw new Error(`${key}: ${response.status} ${await response.text()}`);
  }
}

async function uploadAll(files: string[]) {
  const queue = [...files];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    for (let file = queue.shift(); file; file = queue.shift()) {
      await upload(file);
    }
  });
  await Promise.all(workers);
}

async function main() {
  if (!zone || !password) {
    throw new Error(
      'BUNNY_STORAGE_ZONE and BUNNY_STORAGE_PASSWORD are required',
    );
  }
  const files = listFiles(DIST);
  const assets = files.filter((file) => rank(file) === 0);
  const pages = files.filter((file) => rank(file) === 1);
  await uploadAll(assets);
  await uploadAll(pages);
  console.error(
    `deploy-storage: ${assets.length} assets + ${pages.length} pages → ${zone}`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
