import TagToggle from '@components/tag-toggle';
import {
  BLOGROLL_SEARCH_ID,
  type TBlogrollFilters,
} from '@lib/blogroll-search';

type TBlogrollFiltersProps = {
  filters: TBlogrollFilters;
  tagOrder: string[];
  tagCounts: Record<string, number>;
  shown: number;
  total: number;
  active: boolean;
  /** Settled (debounced) status text for screen readers. */
  announcement: string;
  onQueryChange: (query: string) => void;
  onToggleTag: (tag: string) => void;
};

function BlogrollFilters(props: TBlogrollFiltersProps) {
  return (
    <section aria-label="Search the blogroll" className="my-6 space-y-3">
      <search>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex border border-control-line focus-within:ring-2 focus-within:ring-focus focus-within:ring-offset-1 focus-within:ring-offset-bg"
        >
          <label htmlFor={BLOGROLL_SEARCH_ID} className="sr-only">
            Search posts, authors and topics
          </label>
          <input
            id={BLOGROLL_SEARCH_ID}
            type="search"
            value={props.filters.query}
            onChange={(event) => props.onQueryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && props.filters.query) {
                event.preventDefault();
                props.onQueryChange('');
              }
            }}
            placeholder="Search posts, authors, topics…"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 min-w-0 px-4 py-2 bg-transparent outline-hidden placeholder:text-muted"
          />
        </form>
      </search>

      <fieldset className="flex flex-wrap items-center gap-2">
        <legend className="sr-only">Filter by tag</legend>
        {props.tagOrder.map((tag) => (
          <TagToggle
            key={tag}
            tag={tag}
            count={props.tagCounts[tag] ?? 0}
            pressed={props.filters.tags.includes(tag)}
            onToggle={props.onToggleTag}
          />
        ))}
      </fieldset>

      {/* Visible count updates instantly; it is not a live region so it does
          not announce every keystroke. */}
      {props.active && (
        <p className="text-sm text-muted">
          Showing {props.shown} of {props.total} posts
        </p>
      )}
      <p role="status" className="sr-only">
        {props.announcement}
      </p>
    </section>
  );
}

export default BlogrollFilters;
