import { ASK_ABOUT_ME_CONFIG, type SourcePath } from './config';

export type CvContext = {
  combinedMarkdown: string;
  approxTokens: number;
  builtAt: number;
};

export type ContextSource = {
  path: SourcePath;
  title: string;
  markdown: string;
};

export const titleFromPath = (path: SourcePath): string => {
  if (path === '/curriculum-vitae') {
    return 'Curriculum vitae';
  }
  if (path === '/bookshelf') {
    return 'Bookshelf';
  }
  if (path === '/blogroll') {
    return 'Blogroll';
  }
  return path.replace('/posts/', 'Post: ');
};

export const trimToParagraph = (markdown: string, maxChars: number): string => {
  const trimmed = markdown.trim();
  if (trimmed.length <= maxChars) {
    return trimmed;
  }
  const cut = trimmed.slice(0, maxChars);
  const lastBreak = cut.lastIndexOf('\n\n');
  return (lastBreak > 0 ? cut.slice(0, lastBreak) : cut).trimEnd() + '…';
};

/** Published posts as excerpts, e.g. from `getPublishedPosts()`. */
export const postSources = (
  posts: { slug: string; title?: string; content: string }[],
): ContextSource[] =>
  posts.map((post) => ({
    path: `/posts/${post.slug}` as const,
    title: post.title ?? post.slug,
    markdown: trimToParagraph(
      post.content,
      ASK_ABOUT_ME_CONFIG.postExcerptChars,
    ),
  }));

const combineSources = (sources: ContextSource[]): string =>
  sources
    .map(
      (source) =>
        `## ${source.title}\nSource: ${source.path}\n\n${source.markdown.trim()}`,
    )
    .join('\n\n---\n\n');

/**
 * Built once at build time (see `scripts/postbuild.ts`) from the rendered
 * pages' markdown and post excerpts, then bundled into the edge script.
 */
export const buildCvContext = (
  pageSources: ContextSource[],
  posts: ContextSource[],
  now: number = Date.now(),
): CvContext => {
  const sources = ASK_ABOUT_ME_CONFIG.includePosts
    ? [...pageSources, ...posts]
    : pageSources;
  const combinedMarkdown = combineSources(sources);

  return {
    combinedMarkdown,
    approxTokens: Math.ceil(combinedMarkdown.length / 4),
    builtAt: now,
  };
};
