type TSortablePost = { id: string; filePath?: string };

/** Newest first: `_posts/NNNN-slug.mdx` sorted by file name, descending. */
export const sortPosts = <TPost extends TSortablePost>(
  posts: TPost[],
): TPost[] =>
  posts.toSorted((a, b) =>
    (b.filePath ?? b.id).localeCompare(a.filePath ?? a.id),
  );
