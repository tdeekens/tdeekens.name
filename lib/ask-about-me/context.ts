import { getMarkdownForPath, loadConfig } from 'accept-md-runtime';
import { getPublishedPosts } from '../posts';
import { ASK_ABOUT_ME_CONFIG, type SourcePath } from './config';

type ContextSource = {
  path: SourcePath;
  title: string;
  markdown: string;
};

export type CvContext = {
  sources: ContextSource[];
  combinedMarkdown: string;
  approxTokens: number;
  builtAt: number;
};

type CachedContext = {
  baseUrl: string;
  context: CvContext;
};

let cached: CachedContext | null = null;

const titleFromPath = (path: SourcePath): string => {
  if (path === '/curriculum-vitae') return 'Curriculum vitae';
  if (path === '/bookshelf') return 'Bookshelf';
  if (path === '/blogroll') return 'Blogroll';
  return path.replace('/posts/', 'Post: ');
};

const trimToParagraph = (markdown: string, maxChars: number): string => {
  const trimmed = markdown.trim();
  if (trimmed.length <= maxChars) return trimmed;
  const cut = trimmed.slice(0, maxChars);
  const lastBreak = cut.lastIndexOf('\n\n');
  return (lastBreak > 0 ? cut.slice(0, lastBreak) : cut).trimEnd() + '…';
};

const fetchPageMarkdown = async (
  path: SourcePath,
  baseUrl: string,
): Promise<string> => {
  const config = loadConfig(process.cwd());
  return getMarkdownForPath({ pathname: path, baseUrl, config });
};

const loadPostSources = (): ContextSource[] => {
  const posts = getPublishedPosts() as Array<{
    slug: string;
    title?: string;
    content: string;
  }>;
  return posts.map((post) => ({
    path: `/posts/${post.slug}` as const,
    title: post.title ?? post.slug,
    markdown: trimToParagraph(
      post.content,
      ASK_ABOUT_ME_CONFIG.postExcerptChars,
    ),
  }));
};

const combineSources = (sources: ContextSource[]): string =>
  sources
    .map(
      (source) =>
        `## ${source.title}\nSource: ${source.path}\n\n${source.markdown.trim()}`,
    )
    .join('\n\n---\n\n');

const estimateTokens = (text: string): number => Math.ceil(text.length / 4);

export type GetCvContextOptions = {
  baseUrl: string;
  now?: () => number;
};

export const buildCvContext = async (
  opts: GetCvContextOptions,
): Promise<CvContext> => {
  const pageSources = await Promise.all(
    ASK_ABOUT_ME_CONFIG.pageSourcePaths.map(async (path) => ({
      path,
      title: titleFromPath(path),
      markdown: await fetchPageMarkdown(path, opts.baseUrl),
    })),
  );

  const postSources = ASK_ABOUT_ME_CONFIG.includePosts ? loadPostSources() : [];
  const sources = [...pageSources, ...postSources];
  const combinedMarkdown = combineSources(sources);

  return {
    sources,
    combinedMarkdown,
    approxTokens: estimateTokens(combinedMarkdown),
    builtAt: opts.now?.() ?? Date.now(),
  };
};

export const getCvContext = async (
  opts: GetCvContextOptions,
): Promise<CvContext> => {
  const now = opts.now?.() ?? Date.now();
  if (
    cached &&
    cached.baseUrl === opts.baseUrl &&
    now - cached.context.builtAt < ASK_ABOUT_ME_CONFIG.contextTtlMs
  ) {
    return cached.context;
  }
  const context = await buildCvContext(opts);
  cached = { baseUrl: opts.baseUrl, context };
  return context;
};

export const invalidateCvContext = (): void => {
  cached = null;
};
