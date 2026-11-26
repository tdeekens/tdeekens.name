/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// Reuses the Astro Vite setup (aliases, React/JSX), so tests resolve modules
// exactly like the site build does.
export default getViteConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', 'dist/**', '.astro/**'],
  },
});
