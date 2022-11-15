import Head from 'next/head';
import Dishes from '@components/dishes';
import Text from '@components/text';

const dishes1 = [
  {
    src: '/cooking-diary/dish-1.png',
  },
  {
    src: '/cooking-diary/dish-2.png',
  },
  {
    src: '/cooking-diary/dish-3.png',
  },
  {
    src: '/cooking-diary/dish-4.png',
  },
  {
    src: '/cooking-diary/dish-5.png',
  },
  {
    src: '/cooking-diary/dish-6.png',
  },
];
const dishes2 = [
  {
    src: '/cooking-diary/dish-7.png',
  },
  {
    src: '/cooking-diary/dish-8.png',
  },
  {
    src: '/cooking-diary/dish-9.png',
  },
  {
    src: '/cooking-diary/dish-10.png',
  },
  {
    src: '/cooking-diary/dish-11.png',
  },
  {
    src: '/cooking-diary/dish-12.png',
  },
];
const dishes3 = [
  {
    src: '/cooking-diary/dish-13.png',
  },
  {
    src: '/cooking-diary/dish-14.png',
  },
  {
    src: '/cooking-diary/dish-15.png',
  },
  {
    src: '/cooking-diary/dish-16.png',
  },
  {
    src: '/cooking-diary/dish-17.png',
  },
  {
    src: '/cooking-diary/dish-18.png',
  },
];
const dishes4 = [
  {
    src: '/cooking-diary/dish-19.png',
  },
  {
    src: '/cooking-diary/dish-20.png',
  },
  {
    src: '/cooking-diary/dish-21.png',
  },
  {
    src: '/cooking-diary/dish-22.png',
  },
  {
    src: '/cooking-diary/dish-23.png',
  },
  {
    src: '/cooking-diary/dish-24.png',
  },
];
const dishes5 = [
  {
    src: '/cooking-diary/dish-25.png',
  },
  {
    src: '/cooking-diary/dish-26.png',
  },
  {
    src: '/cooking-diary/dish-27.png',
  },
  {
    src: '/cooking-diary/dish-28.png',
  },
  {
    src: '/cooking-diary/dish-29.png',
  },
  {
    src: '/cooking-diary/dish-30.png',
  },
];
const dishes6 = [
  {
    src: '/cooking-diary/dish-31.png',
  },
  {
    src: '/cooking-diary/dish-32.png',
  },
  {
    src: '/cooking-diary/dish-33.png',
  },
  {
    src: '/cooking-diary/dish-34.png',
  },
  {
    src: '/cooking-diary/dish-35.png',
  },
  {
    src: '/cooking-diary/dish-36.png',
  },
];

const Bookshelf = () => (
  <>
    <Head>
      <title>Tobias Deekens (@tdeekens) - Cooking diary</title>
    </Head>

    <Text.Headline testId="bookshelf-heading" as="h1">
      Cooking diary
    </Text.Headline>

    <Text.Paragraph>
      Having grown up cooking with my family, cooking has become one of my main
      hobbies to relax and socialize.
    </Text.Paragraph>

    <section className="overflow-hidden text-gray-700">
      <Dishes images={dishes1} />
      <Dishes images={dishes2} />
      <Dishes images={dishes3} />
      <Dishes images={dishes4} />
      <Dishes images={dishes5} />
      <Dishes images={dishes6} />
    </section>
  </>
);

export default Bookshelf;
