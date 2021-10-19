import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@components/text';
import List from '@components/list';
import ExternalLink from '@components/external-link';

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center">
      <Head>
        <title>Tobias Deekens (@tdeekens)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-16 my-8 font-mono xl:text-sm max-w-6xl">
        <div className="flex-auto">
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
            passion for the web. I currently work at commercetools as a Tech
            Lead on the Platform team.
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
            <Link href="/cv" passHref>
              <a className="underline hover:no-underline">curriculum vitae</a>
            </Link>
            .
          </Text.Paragraph>
        </div>
      </main>
    </div>
  );
};

export default Home;
