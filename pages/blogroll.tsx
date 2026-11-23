import BlogrollEntry from '@components/blogroll-entry';
import BlogrollFilters from '@components/blogroll-filters';
import Text from '@components/text';
import { blogroll } from '@lib/blogroll';
import {
  countTags,
  filterEntries,
  getTagOrder,
  hasActiveFilters,
} from '@lib/blogroll-search';
import { useBlogrollFilters } from '@lib/use-blogroll-filters';
import Head from 'next/head';
import { useMemo } from 'react';

// Fixed for the page's lifetime so buttons never reorder while filtering.
const tagOrder = getTagOrder(blogroll);
const total = blogroll.length;

function announce(shown: number, active: boolean): string {
  if (!active) {
    return '';
  }
  if (shown === 0) {
    return 'No posts match';
  }
  return `Showing ${shown} of ${total} posts`;
}

const Blogroll = () => {
  const { filters, settledFilters, setQuery, toggleTag, clear } =
    useBlogrollFilters(tagOrder);

  const visible = useMemo(() => filterEntries(blogroll, filters), [filters]);
  const tagCounts = useMemo(
    () => countTags(blogroll, filters.query, tagOrder),
    [filters.query],
  );
  const settledShown = useMemo(
    () => filterEntries(blogroll, settledFilters).length,
    [settledFilters],
  );
  const active = hasActiveFilters(filters);

  return (
    <>
      <Head>
        <title>Tobias Deekens (@tdeekens) - Blogroll</title>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Tobias Deekens - Blogroll"
          href="/blogroll.xml"
        />
      </Head>

      <Text.Headline testId="blogroll-heading" as="h1">
        Blogroll
      </Text.Headline>

      <Text.Paragraph>
        A collection of blog posts I enjoyed reading and found worth sharing.
        Also available as an{' '}
        {/* The feed is a static file in `public`, not a Next.js page, so `<a>` is
          correct here and `next/link` would be wrong. */}
        {/* oxlint-disable-next-line nextjs/no-html-link-for-pages */}
        <a
          href="/blogroll.xml"
          className="underline text-link decoration-link-underline hover:text-link-hover hover:no-underline"
        >
          RSS feed
        </a>
        .
      </Text.Paragraph>

      <BlogrollFilters
        filters={filters}
        tagOrder={tagOrder}
        tagCounts={tagCounts}
        shown={visible.length}
        total={total}
        active={active}
        announcement={announce(settledShown, hasActiveFilters(settledFilters))}
        onQueryChange={setQuery}
        onToggleTag={toggleTag}
      />

      {/* Keeps the heading outline h1 > h2 > h3 (entries are h3). */}
      <h2 className="sr-only">Posts</h2>

      {visible.length === 0 ? (
        <div className="my-8 space-y-3">
          <Text.Paragraph>No posts match.</Text.Paragraph>
          <button
            type="button"
            onClick={clear}
            className="px-3 py-1 text-sm border border-control-line hover:bg-surface-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-focus"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <section className="grid gap-4 my-8 sm:grid-cols-1 md:grid-cols-2">
          {visible.map((entry) => (
            <BlogrollEntry
              key={entry.href}
              title={entry.title}
              href={entry.href}
              author={entry.author}
              teaser={entry.teaser}
              tags={entry.tags}
              selectedTags={filters.tags}
              onToggleTag={toggleTag}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default Blogroll;
