import type { TBlogrollEntry } from '@lib/blogroll';

/**
 * Pure search/filter logic for the blogroll. Everything runs in the browser:
 * ~300 entries filter in well under a millisecond, so there is no index.
 */

/** DOM id of the search field; the `/` shortcut focuses it. */
export const BLOGROLL_SEARCH_ID = 'blogroll-search';

export type TBlogrollFilters = {
  query: string;
  tags: string[];
};

export type TUrlQuery = Record<string, string | string[] | undefined>;

export const EMPTY_FILTERS: TBlogrollFilters = { query: '', tags: [] };

/** Lowercase and strip accents, so "Café" matches "cafe". */
export function normalize(text: string): string {
  return (
    text
      .normalize('NFD')
      // Combining diacritical marks left behind by NFD decomposition.
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  );
}

export function tokenize(query: string): string[] {
  return normalize(query).split(/\s+/).filter(Boolean);
}

const haystacks = new WeakMap<TBlogrollEntry, string>();

function haystackOf(entry: TBlogrollEntry): string {
  let haystack = haystacks.get(entry);
  if (haystack === undefined) {
    haystack = normalize(`${entry.title} ${entry.author} ${entry.teaser}`);
    haystacks.set(entry, haystack);
  }
  return haystack;
}

/** Every token must appear in title, author or teaser, in any order. */
function matchesQuery(entry: TBlogrollEntry, tokens: string[]): boolean {
  if (tokens.length === 0) {
    return true;
  }
  const haystack = haystackOf(entry);
  return tokens.every((token) => haystack.includes(token));
}

/** Selected tags combine with OR; an empty selection matches everything. */
function matchesTags(entry: TBlogrollEntry, tags: string[]): boolean {
  if (tags.length === 0) {
    return true;
  }
  return tags.some((tag) => entry.tags?.includes(tag) ?? false);
}

/** Keeps the original (newest-first) order; no relevance ranking. */
export function filterEntries(
  entries: TBlogrollEntry[],
  filters: TBlogrollFilters,
): TBlogrollEntry[] {
  const tokens = tokenize(filters.query);
  return entries.filter(
    (entry) => matchesQuery(entry, tokens) && matchesTags(entry, filters.tags),
  );
}

/** All tags, ordered by how many entries use them (most first), then name. */
export function getTagOrder(entries: TBlogrollEntry[]): string[] {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .toSorted(
      ([a, countA], [b, countB]) => countB - countA || a.localeCompare(b),
    )
    .map(([tag]) => tag);
}

/**
 * How many entries each tag would show given the current search text. The
 * tag selection is ignored on purpose: the count answers "what would this tag
 * give me", which stays meaningful with OR semantics.
 */
export function countTags(
  entries: TBlogrollEntry[],
  query: string,
  tagOrder: string[],
): Record<string, number> {
  const tokens = tokenize(query);
  const counts: Record<string, number> = Object.fromEntries(
    tagOrder.map((tag) => [tag, 0]),
  );
  for (const entry of entries) {
    if (!matchesQuery(entry, tokens)) {
      continue;
    }
    for (const tag of entry.tags ?? []) {
      if (tag in counts) {
        counts[tag] += 1;
      }
    }
  }
  return counts;
}

/** Adds or removes a tag, keeping the selection in `tagOrder` order. */
export function toggleTag(
  tags: string[],
  tag: string,
  tagOrder: string[],
): string[] {
  const next = new Set(tags);
  if (next.has(tag)) {
    next.delete(tag);
  } else {
    next.add(tag);
  }
  return tagOrder.filter((known) => next.has(known));
}

export function hasActiveFilters(filters: TBlogrollFilters): boolean {
  return filters.query.trim() !== '' || filters.tags.length > 0;
}

const toArray = (value: string | string[] | undefined): string[] => {
  if (value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

/**
 * Reads `?q=…&tag=…&tag=…`. Unknown and duplicate tags are dropped, tag names
 * ignore case, and a blank `q` means no search.
 */
export function parseFilters(
  urlQuery: TUrlQuery,
  tagOrder: string[],
): TBlogrollFilters {
  const query = toArray(urlQuery.q)[0]?.trim() ?? '';
  const requested = new Set(
    toArray(urlQuery.tag).map((tag) => tag.trim().toLowerCase()),
  );
  return {
    query,
    tags: tagOrder.filter((tag) => requested.has(tag.toLowerCase())),
  };
}

/** The inverse of `parseFilters`; omits empty values for clean URLs. */
export function serializeFilters(filters: TBlogrollFilters): TUrlQuery {
  const urlQuery: TUrlQuery = {};
  const query = filters.query.trim();
  if (query) {
    urlQuery.q = query;
  }
  if (filters.tags.length > 0) {
    urlQuery.tag = filters.tags;
  }
  return urlQuery;
}
