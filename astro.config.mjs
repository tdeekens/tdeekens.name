// @ts-check
import { fileURLToPath } from 'node:url';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

/** @param {string} path */
const fromRoot = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  site: process.env.SITE_URL || 'https://www.tdeekens.name',
  output: 'static',
  // `/bookshelf` → `bookshelf.html`; the edge handler maps clean URLs to files
  // and redirects trailing slashes away, as the site did on Vercel.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': fromRoot('./components'),
        '@lib': fromRoot('./lib'),
        '@styles': fromRoot('./styles'),
        '@views': fromRoot('./views'),
      },
    },
  },
});
