import {
  EMPTY_FILTERS,
  parseFilters,
  serializeFilters,
  type TBlogrollFilters,
  toggleTag as toggleTagIn,
} from '@lib/blogroll-search';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

/** Delay before the URL and the screen reader announcement catch up. */
export const SETTLE_DELAY_MS = 300;

const sameFilters = (a: TBlogrollFilters, b: TBlogrollFilters) =>
  a.query.trim() === b.query.trim() &&
  a.tags.length === b.tags.length &&
  a.tags.every((tag, i) => tag === b.tags[i]);

/**
 * Filter state for the blogroll, mirrored in the URL (`?q=…&tag=…`).
 *
 * - `filters` changes on every keystroke and drives the list.
 * - `settledFilters` lags by `SETTLE_DELAY_MS` and drives the URL and the
 *   live-region announcement, so neither churns while someone types.
 *
 * The page is static, so the URL is only readable once the router is ready;
 * a filtered link may show the full list for about a frame first.
 */
export function useBlogrollFilters(tagOrder: string[]) {
  const router = useRouter();
  const [filters, setFilters] = useState<TBlogrollFilters>(EMPTY_FILTERS);
  const [settledFilters, setSettledFilters] =
    useState<TBlogrollFilters>(EMPTY_FILTERS);
  const hasReadUrl = useRef(false);

  // Read the URL once, as soon as the router knows the query.
  useEffect(() => {
    if (!router.isReady || hasReadUrl.current) {
      return;
    }
    hasReadUrl.current = true;
    const fromUrl = parseFilters(router.query, tagOrder);
    setFilters(fromUrl);
    setSettledFilters(fromUrl);
  }, [router.isReady, router.query, tagOrder]);

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
    if (sameFilters(settledFilters, parseFilters(router.query, tagOrder))) {
      return;
    }
    void router.replace(
      { pathname: router.pathname, query: serializeFilters(settledFilters) },
      undefined,
      { shallow: true, scroll: false },
    );
  }, [settledFilters, router, tagOrder]);

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
