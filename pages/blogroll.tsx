import BlogrollEntry from '@components/blogroll-entry';
import Text from '@components/text';
import { blogroll } from '@lib/blogroll';
import Head from 'next/head';

const Blogroll = () => (
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
      A collection of blog posts I enjoyed reading and found worth sharing. Also
      available as an{' '}
      {/* The feed is a static file in `public`, not a Next.js page, so `<a>` is
          correct here and `next/link` would be wrong. */}
      {/* oxlint-disable-next-line nextjs/no-html-link-for-pages */}
      <a href="/blogroll.xml" className="underline hover:no-underline">
        RSS feed
      </a>
      .
    </Text.Paragraph>

    <section className="grid gap-4 my-8 sm:grid-cols-1 md:grid-cols-2">
      {blogroll.map((entry) => (
        <BlogrollEntry
          key={entry.href}
          title={entry.title}
          href={entry.href}
          author={entry.author}
          teaser={entry.teaser}
          tags={entry.tags}
        />
      ))}
    </section>
  </>
);

export default Blogroll;
