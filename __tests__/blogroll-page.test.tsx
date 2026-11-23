import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

type TRouter = {
  isReady: boolean;
  pathname: string;
  query: Record<string, string | string[]>;
  replace: jest.Mock;
};

const router: TRouter = {
  isReady: true,
  pathname: '/blogroll',
  query: {},
  replace: jest.fn(),
};

jest.unstable_mockModule('next/router', () => ({ useRouter: () => router }));

// Lives outside `pages/` because Next.js treats every file there as a route.
const { default: Blogroll } = await import('@pages/blogroll');
const { blogroll } = await import('@lib/blogroll');
const { useShortcuts } = await import('@lib/use-shortcuts');

function WithShortcuts() {
  useShortcuts(() => {});
  return <Blogroll />;
}

const articles = () => screen.queryAllByRole('article');
const search = () => screen.getByRole('searchbox');
const tagBar = () => screen.getByRole('group', { name: 'Filter by tag' });
const lastReplace = () =>
  (router.replace.mock.calls.at(-1)?.[0] as { query: unknown } | undefined)
    ?.query;
const setup = () =>
  userEvent.setup({ advanceTimers: (ms) => jest.advanceTimersByTime(ms) });
const settle = () => act(() => jest.advanceTimersByTime(300));

beforeEach(() => {
  jest.useFakeTimers();
  router.query = {};
  router.replace.mockClear();
  localStorage.clear();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('Blogroll search', () => {
  it('shows every entry and no count without filters', () => {
    render(<Blogroll />);
    expect(articles()).toHaveLength(blogroll.length);
    expect(screen.queryByText(/^Showing/)).not.toBeInTheDocument();
  });

  it('filters while typing, then updates the URL and announces the count', async () => {
    const user = setup();
    render(<Blogroll />);
    const expected = blogroll.filter((e) =>
      `${e.title} ${e.author} ${e.teaser}`.toLowerCase().includes('agent'),
    ).length;

    await user.type(search(), 'agent');
    expect(articles()).toHaveLength(expected);
    expect(
      screen.getByText(`Showing ${expected} of ${blogroll.length} posts`),
    ).toBeInTheDocument();
    // Nothing announced or written mid-typing...
    expect(router.replace).not.toHaveBeenCalled();

    await settle();
    expect(lastReplace()).toEqual({ q: 'agent' });
    expect(screen.getByRole('status')).toHaveTextContent(
      `Showing ${expected} of ${blogroll.length} posts`,
    );
  });

  it('toggles tags from the bar with OR semantics and pressed state', async () => {
    const user = setup();
    render(<Blogroll />);
    const career = within(tagBar()).getByRole('button', { name: /^career/ });
    const frontend = within(tagBar()).getByRole('button', {
      name: /^frontend/,
    });

    await user.click(career);
    expect(career).toHaveAttribute('aria-pressed', 'true');
    const careerOnly = blogroll.filter((e) => e.tags?.includes('career'));
    expect(articles()).toHaveLength(careerOnly.length);

    await user.click(frontend);
    const either = blogroll.filter(
      (e) => e.tags?.includes('career') || e.tags?.includes('frontend'),
    );
    expect(articles()).toHaveLength(either.length);

    await settle();
    expect(lastReplace()).toEqual({ tag: ['frontend', 'career'] });
  });

  it('shows per-tag counts that follow the search text', async () => {
    const user = setup();
    render(<Blogroll />);
    const total = blogroll.filter((e) => e.tags?.includes('ai')).length;
    expect(
      within(tagBar()).getByRole('button', { name: `ai ${total} posts` }),
    ).toBeInTheDocument();

    await user.type(search(), 'zzzz-no-match');
    expect(
      within(tagBar()).getByRole('button', { name: 'ai 0 posts' }),
    ).toBeInTheDocument();
  });

  it('toggles the same filter from a tag on an entry', async () => {
    const user = setup();
    render(<Blogroll />);
    const first = articles()[0];
    const tag = blogroll[0].tags?.[0] as string;

    await user.click(
      within(first).getByRole('button', { name: `Filter by tag: ${tag}` }),
    );
    expect(
      within(tagBar()).getByRole('button', {
        name: (name) => name.startsWith(tag),
      }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(articles().length).toBeLessThan(blogroll.length);
  });

  it('shows an empty state with a working Clear filters button', async () => {
    const user = setup();
    render(<Blogroll />);

    await user.type(search(), 'zzzz-no-match');
    expect(articles()).toHaveLength(0);
    expect(screen.getByText('No posts match.')).toBeInTheDocument();
    await settle();
    expect(screen.getByRole('status')).toHaveTextContent('No posts match');

    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(articles()).toHaveLength(blogroll.length);
    expect(search()).toHaveValue('');
  });

  it('clears the search with Escape', async () => {
    const user = setup();
    render(<Blogroll />);

    await user.type(search(), 'agent');
    await user.keyboard('{Escape}');
    expect(search()).toHaveValue('');
    expect(articles()).toHaveLength(blogroll.length);
  });

  it('applies filters from the URL on load, ignoring unknown tags', () => {
    router.query = { q: 'agent', tag: ['AI', 'nope'] };
    render(<Blogroll />);

    expect(search()).toHaveValue('agent');
    expect(
      within(tagBar()).getByRole('button', { name: /^ai/ }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(articles().length).toBeLessThan(blogroll.length);
  });

  it('focuses the search with "/" without typing the slash', async () => {
    const user = setup();
    render(<WithShortcuts />);

    await user.keyboard('/');
    expect(search()).toHaveFocus();
    expect(search()).toHaveValue('');
  });
});
