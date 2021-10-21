import Head from 'next/head';
import Text from '@components/text';
import ExternalLink from '@components/external-link';
import Blockquote from '@components/blockquote';

const Nonsense = () => (
  <>
    <Head>
      <title>Tobias Deekens (@tdeekens) - Nonsense</title>
    </Head>

    <Text.Headline as="h1">Nonsense</Text.Headline>

    <Text.Paragraph>
      This is a wildly unambitious collection of hopefully entertaining quotes
      and links.
    </Text.Paragraph>

    <section className="my-8 space-y-4">
      <article>
        <ExternalLink href="http://www.youtube.com/watch?v=2lR7s1Y6Zig">
          What does earth look like? Well, not as you thought!
        </ExternalLink>
      </article>
      <article>
        <ExternalLink href="http://vimeo.com/22956103">
          Dark matters. A comic on dark matter.
        </ExternalLink>
      </article>
      <article>
        <ExternalLink href="https://www.youtube.com/watch?v=DQy_HFHOZug">
          Kevin Rose interviewing Jack Dorsey
        </ExternalLink>
      </article>
      <article>
        <Blockquote>
          “You can&apos;t upstrum yourself into thoughness.” (Josh Homme)
        </Blockquote>
      </article>
      <article>
        <ExternalLink href="http://www.youtube.com/watch?v=UIDb6VBO9os">
          @fat talking OpenSource
        </ExternalLink>
      </article>
      <article>
        <ExternalLink href="http://www.ted.com/talks/jeff_bezos_on_the_next_web_innovation.html">
          Jeff Bezos - The electricity metaphor for the web&quot;s future
        </ExternalLink>
      </article>
      <article>
        <Blockquote>
          “I&quot;m retired. I invented dice when I was a kid.” (Kiss Kiss Bang
          Bang)
        </Blockquote>
      </article>
      <article>
        <ExternalLink href="http://www.youtube.com/watch?v=xwOCmJevigw">
          Three Minute Philosophy - Immanuel Kant
        </ExternalLink>
      </article>
      <article>
        <ExternalLink href="http://www.youtube.com/watch?v=MijmeoH9LT4">
          The most used hack around (UTF-8)
        </ExternalLink>
      </article>
      <article>
        <Blockquote>
          “Fake yuppie experiences that you had to spend money on, like white
          water rafting or elephant rides in Thailand don&quot;t count. I want
          to hear some small moment from your life that proves you&quot;re
          really alive.” (Douglas Coupland - Generation X)
        </Blockquote>
      </article>
      <article>
        <ExternalLink href="http://zachholman.com/posts/how-github-works/">
          @holman how GitHub works
        </ExternalLink>
      </article>
      <article>
        <Blockquote>
          “A life. A life, Jimmy. You know what that is? It&quot;s the shit that
          happens while you&quot;re waiting for moments that never come.” (The
          Wire)
        </Blockquote>
      </article>
    </section>
  </>
);

export default Nonsense;
