import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@components/text';
import List from '@components/list';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import ExternalLink from '@components/external-link';

type THomeProps = {
  posts: Array<{
    title: string;
    slug: string;
  }>;
};

const Home = (props: THomeProps) => (
  <>
    <Head>
      <title>Tobias Deekens (@tdeekens)</title>
    </Head>

    <div className="flex-auto">
      <section>
        <div className="flex-auto text-center mb-8">
          <Image
            className="object-cover w-100 h-100 rounded-full"
            src="/me.jpg"
            alt="@tdeekens avatar"
            width="100"
            height="100"
          />
        </div>
        <Text.Headline as="h1">👋 Hi there,</Text.Headline>

        <Text.Paragraph>
          my name is <strong>Tobias Deekens</strong>. I am a developer with
          passion for the web. I currently work at commercetools as a Tech Lead
          on the Platform team.
        </Text.Paragraph>

        <Text.Paragraph>You can also find me on:</Text.Paragraph>

        <List.Unordered>
          <li>
            <ExternalLink href="http://www.github.com/tdeekens">
              GitHub
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="http://twitter.com/tdeekens">
              twitter.com
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="http://www.linkedin.com/pub/tobias-deekens/76/b00/197">
              linkedin.com
            </ExternalLink>
          </li>
        </List.Unordered>

        <Text.Paragraph>
          If you want to learn more about my work please head to my{' '}
          <Link href="/curriculum-vitae" passHref>
            <a className="underline hover:no-underline">curriculum vitae</a>
          </Link>
          .
        </Text.Paragraph>
      </section>

      <section className="my-4">
        <Text.Headline as="h1">📝 Blog</Text.Headline>
        {props.posts.map((post) => (
          <Text.Paragraph key={post.slug}>
            <Link href={`posts/${post.slug}`} passHref>
              <a className="underline hover:no-underline">{post.title}</a>
            </Link>
          </Text.Paragraph>
        ))}
      </section>
    </div>
  </>
);

const postsDirectory = path.join(process.cwd(), '_posts');

export const getStaticProps = async () => {
  const files = fs.readdirSync(postsDirectory);
  const posts = files.map((filename) => {
    const rawPost = fs.readFileSync(`${postsDirectory}/${filename}`, 'utf-8');
    const parsedWithFrontmatter = matter(rawPost);

    return {
      title: parsedWithFrontmatter.data.title,
      slug: parsedWithFrontmatter.data.slug,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default Home;
