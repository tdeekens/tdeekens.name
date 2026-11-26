#!/usr/bin/env tsx
/**
 * Uploads `dist-edge/bunny.js` to a Bunny Edge Script and publishes it as a
 * release, using the Edge Scripting API directly (no third-party action).
 *
 * Env: BUNNY_API_KEY, BUNNY_SCRIPT_ID, GITHUB_SHA (optional release note)
 */
import { readFileSync } from 'node:fs';

const API = 'https://api.bunny.net/compute/script';
const file = process.argv[2] ?? 'dist-edge/bunny.js';

async function call(path: string, body: unknown) {
  const response = await fetch(`${API}/${process.env.BUNNY_SCRIPT_ID}${path}`, {
    method: 'POST',
    headers: {
      AccessKey: process.env.BUNNY_API_KEY as string,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`${path}: ${response.status} ${await response.text()}`);
  }
}

async function main() {
  if (!process.env.BUNNY_API_KEY || !process.env.BUNNY_SCRIPT_ID) {
    throw new Error('BUNNY_API_KEY and BUNNY_SCRIPT_ID are required');
  }
  await call('/code', { Code: readFileSync(file, 'utf8') });
  await call('/publish', {
    Note: process.env.GITHUB_SHA
      ? `commit ${process.env.GITHUB_SHA}`
      : 'manual',
  });
  console.error(
    `deploy-edge: published ${file} to script ${process.env.BUNNY_SCRIPT_ID}`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
