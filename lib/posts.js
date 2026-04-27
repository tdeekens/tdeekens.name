const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), '_posts');

const slugFromFileName = (fileName) =>
  fileName
    .replace(/\.mdx?$/, '')
    .split('-')
    .slice(1)
    .join('-');

const readPost = (fileName) => {
  const postFile = path.join(postsDirectory, fileName);
  const rawPost = fs.readFileSync(postFile, 'utf8');
  const parsedWithFrontmatter = matter(rawPost);
  const slug =
    typeof parsedWithFrontmatter.data.slug === 'string'
      ? parsedWithFrontmatter.data.slug
      : slugFromFileName(fileName);

  return {
    content: parsedWithFrontmatter.content,
    draft: Boolean(parsedWithFrontmatter.data.draft),
    fileName,
    postFile,
    slug,
    title: parsedWithFrontmatter.data.title,
    updatedAt: fs.statSync(postFile).mtime.toISOString(),
  };
};

const getAllPosts = () =>
  fs
    .readdirSync(postsDirectory)
    .reverse()
    .map((fileName) => readPost(fileName));

const getPublishedPosts = () => getAllPosts().filter((post) => !post.draft);

const getPostBySlug = (slug) =>
  getAllPosts().find(
    (post) => post.slug === slug || post.fileName.includes(slug),
  );

module.exports = {
  getAllPosts,
  getPostBySlug,
  getPublishedPosts,
};
