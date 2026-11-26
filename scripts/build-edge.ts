#!/usr/bin/env tsx
/**
 * Bundles an edge entry (default `edge/bunny.ts`) into one ESM file that can
 * be uploaded as a Bunny Edge Script. Needs `edge/generated/context.json`
 * from `scripts/postbuild.ts`.
 */
import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';

const entry = process.argv[2] ?? 'edge/bunny.ts';
const outfile = process.argv[3] ?? 'dist-edge/bunny.js';
const root = (path: string) =>
  fileURLToPath(new URL(`../${path}`, import.meta.url));

async function main() {
  await build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    target: 'es2023',
    minify: true,
    sourcemap: false,
    // Provided by the Deno-based runtime.
    external: ['node:*'],
    mainFields: ['module', 'main'],
    conditions: ['worker', 'browser', 'import', 'default'],
    alias: { '@lib': root('lib') },
    legalComments: 'none',
    logLevel: 'warning',
  });
  const kb = Math.round(statSync(outfile).size / 1024);
  console.error(`build-edge: ${outfile} (${kb} KB)`);
}

void main();
