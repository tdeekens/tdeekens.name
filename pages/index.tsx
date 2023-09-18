import Head from 'next/head';
import Image from 'next/image';
import Text from '@components/text';
import List from '@components/list';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import ExternalLink from '@components/external-link';
import InternalLink from '@components/internal-link';

type THomeProps = {
  posts: Array<{
    title: string;
    slug: string;
    draft: boolean;
  }>;
};

const Home = (props: THomeProps) => (
  <>
    <Head>
      <title>Tobias Deekens (@tdeekens)</title>
    </Head>

    <div className="flex-auto">
      <section>
        <div className="flex-auto mb-8 text-center">
          <Image
            className="object-cover rounded-full w-200 h-200"
            src="/me.jpg"
            alt="@tdeekens avatar"
            width="200"
            height="200"
          />
        </div>
        <Text.Headline as="h1" testId="index-welcome-heading">
          👋 Hi there,
        </Text.Headline>

        <Text.Paragraph>
          my name is <strong>Tobias Deekens</strong>. I like to design and build{' '}
          <strong>software for the web</strong>. I currently work at
          commercetools as a Principal Engineer on the Composable Commerce Team
          focussing on Frontend Architecture.
        </Text.Paragraph>

        <Text.Paragraph>You can also find me on:</Text.Paragraph>

        <List.Unordered>
          <li className="list-none">
            <ExternalLink
              underline={false}
              href="http://www.github.com/tdeekens"
            >
              <div className="flex items-baseline space-x-2">
                <Image
                  src="/github-icon.svg"
                  alt="GitHub profile"
                  width="13"
                  height="13"
                />
                <span>GitHub</span>
              </div>
            </ExternalLink>
          </li>
          <li className="list-none">
            <ExternalLink underline={false} href="http://twitter.com/tdeekens">
              <div className="flex items-baseline space-x-2">
                <Image
                  src="/twitter-icon.svg"
                  alt="Twitter profile"
                  width="13"
                  height="13"
                />
                <span>Twitter</span>
              </div>
            </ExternalLink>
          </li>
          <li className="list-none">
            <ExternalLink
              underline={false}
              href="http://www.linkedin.com/pub/tobias-deekens/76/b00/197"
            >
              <div className="flex items-baseline space-x-2">
                <Image
                  src="/linkedin-icon.svg"
                  alt="Linkedin profile"
                  width="11"
                  height="11"
                />
                <span>LinkedIn</span>
              </div>
            </ExternalLink>
          </li>
        </List.Unordered>

        <Text.Paragraph>
          If you want to learn more about my work please head to my{' '}
          <InternalLink href="/curriculum-vitae" testId="cv-link">
            curriculum vitae
          </InternalLink>
          . Given you&apos;re here for nonserious matters you can check out a{' '}
          <InternalLink testId="bookshelf-link" href="/bookshelf">
            bookshelf
          </InternalLink>
          , listen to some music in my{' '}
          <InternalLink href="/jukebox">jukebox</InternalLink> or enjoy some
          hopefully entertaining{' '}
          <InternalLink href="/nonsense">nonsense</InternalLink>. If you are
          enjoying cooking I made some mediocre fotos of things I cooked in my{' '}
          <InternalLink href="/cooking-diary">cooking diary</InternalLink>.
        </Text.Paragraph>
      </section>

      <section className="my-8">
        <Text.Headline as="h2">🔗 External articles</Text.Headline>
        <Text.Paragraph>
          <ExternalLink href="https://commercetools.com/blog/how-we-evaluated-the-impact-of-github-copilot-for-3-months">
            How we evaluated the impact of GitHub Copilot for 3 months
          </ExternalLink>
        </Text.Paragraph>
        <Text.Paragraph>
          <ExternalLink href="https://commercetools.com/blog/3-years-of-sustaining-open-source-through-our-donation-program">
            3 years of sustaining Open Source through our donation program
          </ExternalLink>
        </Text.Paragraph>
        <Text.Paragraph>
          <ExternalLink href="https://techblog.commercetools.com/veni-vidi-vici-my-journey-into-mastering-remote-working-79131ec974d7">
            Veni, vidi, vici: my journey into mastering remote working
          </ExternalLink>
        </Text.Paragraph>
        <Text.Paragraph>
          <ExternalLink href="https://techblog.commercetools.com/five-practical-tips-when-using-react-hooks-in-production-990a79745229">
            Five practical tips when using React hooks in production
          </ExternalLink>
        </Text.Paragraph>
        <Text.Paragraph>
          <ExternalLink href="https://techblog.commercetools.com/render-props-apollo-and-formik-build-and-compose-forms-in-react-with-ease-f79a594be239">
            Render Props, Apollo and Formik: build and compose forms in React
            with ease
          </ExternalLink>
        </Text.Paragraph>
        <Text.Paragraph>
          <ExternalLink href="https://techblog.commercetools.com/seven-patterns-by-example-the-many-ways-to-type-radio-in-react-bfe14322bb6f">
            Seven patterns by example: The many ways to `type=&quot;radio&quot;`
            in React
          </ExternalLink>
        </Text.Paragraph>
        <Text.Paragraph>
          <ExternalLink href="https://techblog.commercetools.com/embracing-real-time-feature-toggling-in-your-react-application-a5e6052716a9">
            Embracing real-time feature toggling in your React application
          </ExternalLink>
        </Text.Paragraph>
      </section>

      <section className="my-8">
        <Text.Headline as="h2">📝 Blog</Text.Headline>
        {props.posts.map(
          (post) =>
            !post.draft && (
              <Text.Paragraph key={post.slug}>
                <InternalLink href={`/posts/${post.slug}`}>
                  {post.title}
                </InternalLink>
              </Text.Paragraph>
            )
        )}
      </section>

      <section className="my-8">
        <Text.Headline as="h2">🗣️ Talks</Text.Headline>
        <Text.Paragraph>
          <ExternalLink href="https://slides.com/tdeekens/power-to-the-toggles-exended">
            Power to the toggles - how feature flags liberate your development
            workflow
          </ExternalLink>
        </Text.Paragraph>
        <Text.Paragraph>
          <ExternalLink href="https://slides.com/tdeekens/this-immutable-thing">
            Escaping mutability hell with persistent immutable data structures
          </ExternalLink>
        </Text.Paragraph>
        <Text.Paragraph>
          <ExternalLink href="https://slides.com/tdeekens/micropuzzling">
            Micropuzzling: Implications of slicing web frontends according to
            Microservices
          </ExternalLink>
        </Text.Paragraph>
        <Text.Paragraph>
          <ExternalLink href="https://slides.com/tdeekens/css-with-a-hash">
            CSS with a hash
          </ExternalLink>
        </Text.Paragraph>
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
      draft: parsedWithFrontmatter.data.draft,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default Home;
