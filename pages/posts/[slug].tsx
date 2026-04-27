import type { GetStaticPropsContext } from 'next';
import type { THeadlineProps, TParagraphProps } from '@components/text';
import type { TOrderedProps, TUnorderedProps } from '@components/list';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Image from 'next/image';
import { serialize } from 'next-mdx-remote/serialize';
import Text from '@components/text';
import List from '@components/list';
import Blockquote from '@components/blockquote';
import { getAllPosts, getPostBySlug } from '../../lib/posts';

type TPostProps = {
  matter: {
    title: string;
  };
  slug: string;
  source: MDXRemoteSerializeResult;
};

const components = {
  h1: (props: Omit<THeadlineProps, 'as'>) => (
    <Text.Headline as="h1" {...props} />
  ),
  h2: (props: Omit<THeadlineProps, 'as'>) => (
    <Text.Headline as="h2" {...props} />
  ),
  p: (props: TParagraphProps) => <Text.Paragraph {...props} />,
  ul: (props: TUnorderedProps) => <List.Unordered {...props} />,
  ol: (props: TOrderedProps) => <List.Ordered {...props} />,
  Blockquote,
  Image,
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

export async function getStaticProps(
  context: GetStaticPropsContext<Pick<TPostProps, 'slug'>>,
) {
  const slug = context.params?.slug;
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(post.content);

  return {
    props: {
      source: mdxSource,
      matter: {
        title: post.title,
        postFile: post.postFile,
      },
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPosts().map((post) => ({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export default Post;
