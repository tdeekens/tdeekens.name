import { defineCollection } from 'astro/content/config';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Blog posts live in `_posts/NNNN-slug.mdx`. The URL slug comes from the
 * `slug` frontmatter, falling back to the file name without its number.
 */
const posts = defineCollection({
  loader: glob({
    base: './_posts',
    pattern: '*.{md,mdx}',
    generateId: ({ entry, data }) =>
      typeof data.slug === 'string'
        ? data.slug
        : entry
            .replace(/\.mdx?$/, '')
            .split('-')
            .slice(1)
            .join('-'),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
