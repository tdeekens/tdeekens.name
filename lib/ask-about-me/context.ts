import { getMarkdownForPath, loadConfig } from 'accept-md-runtime';

import { getPublishedPosts } from '../posts';
import { ASK_ABOUT_ME_CONFIG, type SourcePath } from './config';

export type CvContext = {
  combinedMarkdown: string;
  approxTokens: number;
  builtAt: number;
};

const acceptMdConfig = loadConfig(process.cwd());

let cached: CvContext | null = null;

const titleFromPath = (path: SourcePath): string => {
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

const trimToParagraph = (markdown: string, maxChars: number): string => {
  const trimmed = markdown.trim();
  if (trimmed.length <= maxChars) {
    return trimmed;
  }
  const cut = trimmed.slice(0, maxChars);
  const lastBreak = cut.lastIndexOf('\n\n');
  return (lastBreak > 0 ? cut.slice(0, lastBreak) : cut).trimEnd() + '…';
};

const fetchPageMarkdown = (path: SourcePath, baseUrl: string) =>
  getMarkdownForPath({ pathname: path, baseUrl, config: acceptMdConfig });

type Source = { path: SourcePath; title: string; markdown: string };

const loadPostSources = (): Source[] => {
  const posts = getPublishedPosts() as {
    slug: string;
    title?: string;
    content: string;
  }[];
  return posts.map((post) => ({
    path: `/posts/${post.slug}` as const,
    title: post.title ?? post.slug,
    markdown: trimToParagraph(
      post.content,
      ASK_ABOUT_ME_CONFIG.postExcerptChars,
    ),
  }));
};

const combineSources = (sources: Source[]): string =>
  sources
    .map(
      (source) =>
        `## ${source.title}\nSource: ${source.path}\n\n${source.markdown.trim()}`,
    )
    .join('\n\n---\n\n');

const buildCvContext = async (baseUrl: string): Promise<CvContext> => {
  const pageSources: Source[] = await Promise.all(
    ASK_ABOUT_ME_CONFIG.pageSourcePaths.map(async (path) => ({
      path,
      title: titleFromPath(path),
      markdown: await fetchPageMarkdown(path, baseUrl),
    })),
  );

  const sources = ASK_ABOUT_ME_CONFIG.includePosts
    ? [...pageSources, ...loadPostSources()]
    : pageSources;

  const combinedMarkdown = combineSources(sources);

  return {
    combinedMarkdown,
    approxTokens: Math.ceil(combinedMarkdown.length / 4),
    builtAt: Date.now(),
  };
};

export const getCvContext = async (baseUrl: string): Promise<CvContext> => {
  if (
    cached &&
    Date.now() - cached.builtAt < ASK_ABOUT_ME_CONFIG.contextTtlMs
  ) {
    return cached;
  }
  cached = await buildCvContext(baseUrl);
  return cached;
};
