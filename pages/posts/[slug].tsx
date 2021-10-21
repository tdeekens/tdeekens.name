import type { GetStaticPropsContext } from 'next';
import type { THeadlineProps, TParagraphProps } from '@components/text';
import type { TUnorderedProps } from '@components/list';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import Text from '@components/text';
import List from '@components/list';

type TPostProps = {
  matter: {
    title: string;
  };
  slug: string;
  source: MDXRemoteSerializeResult;
};

const components = {
  h1: (props: THeadlineProps) => <Text.Headline {...props} as="h1" />,
  h2: (props: THeadlineProps) => <Text.Headline {...props} as="h2" />,
  p: (props: TParagraphProps) => <Text.Paragraph {...props} />,
  ul: (props: TUnorderedProps) => <List.Unordered {...props} />,
};

const Post = (props: TPostProps) => (
  <>
    <Head>
      <title>Tobias Deekens (@tdeekens) - {props.matter.title}</title>
    </Head>

    <Text.Headline as="h1">{props.matter.title}</Text.Headline>
    <MDXRemote {...props.source} components={components} />
  </>
);

const postsDirectory = path.join(process.cwd(), '_posts');

export async function getStaticProps(
  context: GetStaticPropsContext<Pick<TPostProps, 'slug'>>
) {
  const files = fs.readdirSync(postsDirectory);
  // @ts-expect-error params always exist (pray)
  const post = files.find((file) => file.includes(context.params.slug));
  const postFile = `${postsDirectory}/${post}`;
  const rawPost = fs.readFileSync(path.resolve(postFile), 'utf8');
  const parsedWithFrontmatter = matter(rawPost);
  const mdxSource = await serialize(parsedWithFrontmatter.content);

  return {
    props: {
      source: mdxSource,
      matter: {
        title: parsedWithFrontmatter.data.title,
        postFile,
      },
    },
  };
}

export async function getStaticPaths() {
  const paths = fs
    .readdirSync(postsDirectory)
    .map((path) =>
      path
        .replace(/\.mdx?$/, '')
        .split('-')
        .splice(1)
        .join('-')
    )
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export default Post;
