import {
  EMPTY_FILTERS,
  parseFilters,
  serializeFilters,
  type TBlogrollFilters,
  type TUrlQuery,
  toggleTag as toggleTagIn,
} from '@lib/blogroll-search';
import { useCallback, useEffect, useRef, useState } from 'react';

/** Delay before the URL and the screen reader announcement catch up. */
export const SETTLE_DELAY_MS = 300;

const sameFilters = (a: TBlogrollFilters, b: TBlogrollFilters) =>
  a.query.trim() === b.query.trim() &&
  a.tags.length === b.tags.length &&
  a.tags.every((tag, i) => tag === b.tags[i]);

/** `?q=a&tag=x&tag=y` → `{ q: 'a', tag: ['x', 'y'] }`. */
export function readUrlQuery(search: string): TUrlQuery {
  const params = new URLSearchParams(search);
  const urlQuery: TUrlQuery = {};
  for (const key of new Set(params.keys())) {
    const values = params.getAll(key);
    urlQuery[key] = values.length > 1 ? values : values[0];
  }
  return urlQuery;
}

/** The inverse of `readUrlQuery`, as a `?…` string (empty for no filters). */
export function toSearch(urlQuery: TUrlQuery): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(urlQuery)) {
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item !== undefined) {
        params.append(key, item);
      }
    }
  }
  const search = params.toString();
  return search ? `?${search}` : '';
}

/**
 * Filter state for the blogroll, mirrored in the URL (`?q=…&tag=…`).
 *
 * - `filters` changes on every keystroke and drives the list.
 * - `settledFilters` lags by `SETTLE_DELAY_MS` and drives the URL and the
 *   live-region announcement, so neither churns while someone types.
 *
 * The page is static, so the URL is only read after hydration; a filtered
 * link may show the full list for about a frame first.
 */
export function useBlogrollFilters(tagOrder: string[]) {
  const [filters, setFilters] = useState<TBlogrollFilters>(EMPTY_FILTERS);
  const [settledFilters, setSettledFilters] =
    useState<TBlogrollFilters>(EMPTY_FILTERS);
  const hasReadUrl = useRef(false);

  // Read the URL once, after hydration.
  useEffect(() => {
    if (hasReadUrl.current) {
      return;
    }
    hasReadUrl.current = true;
    const fromUrl = parseFilters(
      readUrlQuery(window.location.search),
      tagOrder,
    );
    setFilters(fromUrl);
    setSettledFilters(fromUrl);
  }, [tagOrder]);

  // Let changes settle before they reach the URL and screen readers.
  useEffect(() => {
    if (!hasReadUrl.current) {
      return;
    }
    const timer = setTimeout(() => setSettledFilters(filters), SETTLE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [filters]);

  // Mirror settled filters in the URL, in place (no history entry per change).
  useEffect(() => {
    if (!hasReadUrl.current) {
      return;
    }
    const current = parseFilters(
      readUrlQuery(window.location.search),
      tagOrder,
    );
    if (sameFilters(settledFilters, current)) {
      return;
    }
    const url = `${window.location.pathname}${toSearch(
      serializeFilters(settledFilters),
    )}${window.location.hash}`;
    window.history.replaceState(window.history.state, '', url);
  }, [settledFilters, tagOrder]);

  const setQuery = useCallback(
    (query: string) => setFilters((current) => ({ ...current, query })),
    [],
  );

  const toggleTag = useCallback(
    (tag: string) =>
      setFilters((current) => ({
        ...current,
        tags: toggleTagIn(current.tags, tag, tagOrder),
      })),
    [tagOrder],
  );

  const clear = useCallback(() => setFilters(EMPTY_FILTERS), []);

  return { filters, settledFilters, setQuery, toggleTag, clear };
}
