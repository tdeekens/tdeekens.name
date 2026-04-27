const { getAllPosts } = require('./lib/posts');

const siteUrl = process.env.SITE_URL || 'https://www.tdeekens.name';
const contentSignal = 'Content-Signal: ai-train=no, search=yes, ai-input=no';
const posts = getAllPosts();
const draftPostPaths = new Set(
  posts.filter((post) => post.draft).map((post) => `/posts/${post.slug}`),
);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/cv', '/posts', ...draftPostPaths],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    transformRobotsTxt: async (_, robotsTxt) => {
      const defaultPolicy = 'User-agent: *\nAllow: /';
      const policyWithContentSignal = `User-agent: *\n${contentSignal}\nAllow: /`;

      if (robotsTxt.includes(contentSignal)) {
        return robotsTxt;
      }

      if (robotsTxt.includes(defaultPolicy)) {
        return robotsTxt.replace(defaultPolicy, policyWithContentSignal);
      }

      return `${robotsTxt.trim()}\n${contentSignal}\n`;
    },
  },
  transform: async (config, urlPath) => {
    if (draftPostPaths.has(urlPath)) {
      return null;
    }

    const matchingPost = posts.find(
      (post) => `/posts/${post.slug}` === urlPath,
    );

    return {
      loc: urlPath,
      changefreq: matchingPost ? 'monthly' : 'weekly',
      priority: urlPath === '/' ? 1 : 0.7,
      lastmod: matchingPost ? matchingPost.updatedAt : new Date().toISOString(),
    };
  },
};
