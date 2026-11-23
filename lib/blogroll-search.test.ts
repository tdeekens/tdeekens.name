import { describe, expect, it } from '@jest/globals';
import type { TBlogrollEntry } from '@lib/blogroll';

import {
  countTags,
  filterEntries,
  getTagOrder,
  hasActiveFilters,
  normalize,
  parseFilters,
  serializeFilters,
  tokenize,
  toggleTag,
} from './blogroll-search';

const entry = (
  title: string,
  tags: string[] | undefined,
  extra: Partial<TBlogrollEntry> = {},
): TBlogrollEntry => ({
  title,
  href: `https://example.com/${encodeURIComponent(title)}`,
  author: 'Jane Doe',
  teaser: 'A teaser.',
  tags,
  addedAt: '2026-01-01T00:00:00.000Z',
  ...extra,
});

const entries = [
  entry('React Server Components', ['frontend', 'engineering'], {
    teaser: 'Streams of data the client composes.',
  }),
  entry('Leading through change', ['leadership']),
  entry('Agents in production', ['ai', 'engineering'], {
    author: 'José Müller',
  }),
  entry('Career ladders', ['career', 'leadership']),
  entry('Untagged musings', undefined, { teaser: 'Server rooms at night.' }),
];
const tagOrder = getTagOrder(entries);

describe('normalize / tokenize', () => {
  it('lowercases and strips accents', () => {
    expect(normalize('José Müller CAFÉ')).toBe('jose muller cafe');
  });

  it('splits on any whitespace and drops empties', () => {
    expect(tokenize('  React\tserver  ')).toEqual(['react', 'server']);
    expect(tokenize('   ')).toEqual([]);
  });
});

const titles = (query: string, tags: string[] = []) =>
  filterEntries(entries, { query, tags }).map((e) => e.title);

describe('filterEntries', () => {
  it('returns everything, in order, without filters', () => {
    expect(titles('')).toEqual(entries.map((e) => e.title));
  });

  it('requires every word, in any order, across title, author and teaser', () => {
    // "react" in the title, "client" in the teaser.
    expect(titles('client react')).toEqual(['React Server Components']);
    expect(titles('react nonexistent')).toEqual([]);
  });

  it('ignores case and accents in both query and content', () => {
    expect(titles('JOSE muller')).toEqual(['Agents in production']);
    expect(titles('josé')).toEqual(['Agents in production']);
  });

  it('matches partial words', () => {
    expect(titles('serv')).toEqual([
      'React Server Components',
      'Untagged musings',
    ]);
  });

  it('combines selected tags with OR', () => {
    expect(titles('', ['ai', 'career'])).toEqual([
      'Agents in production',
      'Career ladders',
    ]);
  });

  it('combines tags and search text with AND', () => {
    expect(titles('server', ['frontend'])).toEqual(['React Server Components']);
    expect(titles('server', ['leadership'])).toEqual([]);
  });

  it('excludes untagged entries once a tag is selected', () => {
    expect(titles('musings', ['ai'])).toEqual([]);
  });
});

describe('getTagOrder', () => {
  it('orders by usage, then name', () => {
    // engineering 2, leadership 2, then ai/career/frontend 1 each.
    expect(tagOrder).toEqual([
      'engineering',
      'leadership',
      'ai',
      'career',
      'frontend',
    ]);
  });
});

describe('countTags', () => {
  it('counts every tag without a search', () => {
    expect(countTags(entries, '', tagOrder)).toEqual({
      engineering: 2,
      leadership: 2,
      ai: 1,
      career: 1,
      frontend: 1,
    });
  });

  it('reflects the search text and keeps zero counts', () => {
    expect(countTags(entries, 'server', tagOrder)).toEqual({
      engineering: 1,
      leadership: 0,
      ai: 0,
      career: 0,
      frontend: 1,
    });
  });
});

describe('toggleTag', () => {
  it('adds and removes, keeping tag order', () => {
    expect(toggleTag([], 'ai', tagOrder)).toEqual(['ai']);
    expect(toggleTag(['ai'], 'engineering', tagOrder)).toEqual([
      'engineering',
      'ai',
    ]);
    expect(toggleTag(['engineering', 'ai'], 'engineering', tagOrder)).toEqual([
      'ai',
    ]);
  });
});

describe('hasActiveFilters', () => {
  it('treats blank search and no tags as inactive', () => {
    expect(hasActiveFilters({ query: '  ', tags: [] })).toBe(false);
    expect(hasActiveFilters({ query: 'x', tags: [] })).toBe(true);
    expect(hasActiveFilters({ query: '', tags: ['ai'] })).toBe(true);
  });
});

describe('parseFilters', () => {
  it('reads q and repeated tags', () => {
    expect(
      parseFilters({ q: 'agents', tag: ['ai', 'leadership'] }, tagOrder),
    ).toEqual({ query: 'agents', tags: ['leadership', 'ai'] });
  });

  it('accepts a single tag string', () => {
    expect(parseFilters({ tag: 'ai' }, tagOrder).tags).toEqual(['ai']);
  });

  it('drops unknown and duplicate tags and ignores case', () => {
    expect(
      parseFilters({ tag: ['AI', 'ai', 'foo', ' Career '] }, tagOrder).tags,
    ).toEqual(['ai', 'career']);
  });

  it('treats a blank q as no search and uses the first of several', () => {
    expect(parseFilters({ q: '   ' }, tagOrder).query).toBe('');
    expect(parseFilters({ q: ['one', 'two'] }, tagOrder).query).toBe('one');
    expect(parseFilters({}, tagOrder)).toEqual({ query: '', tags: [] });
  });
});

describe('serializeFilters', () => {
  it('omits empty values and round-trips with parseFilters', () => {
    expect(serializeFilters({ query: '  ', tags: [] })).toEqual({});
    const filters = { query: 'agents', tags: ['ai', 'career'] };
    const urlQuery = serializeFilters(filters);
    expect(urlQuery).toEqual({ q: 'agents', tag: ['ai', 'career'] });
    expect(parseFilters(urlQuery, tagOrder)).toEqual(filters);
  });
});
