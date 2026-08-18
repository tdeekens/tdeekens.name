import Dishes from '@components/dishes';
import Text from '@components/text';
import Head from 'next/head';

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
const dishes7 = [
  {
    src: '/cooking-diary/dish-37.png',
  },
  {
    src: '/cooking-diary/dish-38.png',
  },
  {
    src: '/cooking-diary/dish-39.png',
  },
  {
    src: '/cooking-diary/dish-40.png',
  },
  {
    src: '/cooking-diary/dish-41.png',
  },
  {
    src: '/cooking-diary/dish-42.png',
  },
];
const dishes8 = [
  {
    src: '/cooking-diary/dish-43.png',
  },
  {
    src: '/cooking-diary/dish-44.png',
  },
  {
    src: '/cooking-diary/dish-45.png',
  },
  {
    src: '/cooking-diary/dish-46.png',
  },
  {
    src: '/cooking-diary/dish-47.png',
  },
  {
    src: '/cooking-diary/dish-48.png',
  },
];
const dishes9 = [
  {
    src: '/cooking-diary/dish-49.png',
  },
  {
    src: '/cooking-diary/dish-50.png',
  },
  {
    src: '/cooking-diary/dish-51.png',
  },
  {
    src: '/cooking-diary/dish-52.png',
  },
  {
    src: '/cooking-diary/dish-53.png',
  },
  {
    src: '/cooking-diary/dish-54.png',
  },
];
const dishes10 = [
  {
    src: '/cooking-diary/dish-55.png',
  },
  {
    src: '/cooking-diary/dish-56.png',
  },
  {
    src: '/cooking-diary/dish-57.png',
  },
  {
    src: '/cooking-diary/dish-58.png',
  },
  {
    src: '/cooking-diary/dish-59.png',
  },
  {
    src: '/cooking-diary/dish-60.png',
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
      <Dishes images={dishes10} />
      <Dishes images={dishes9} />
      <Dishes images={dishes8} />
      <Dishes images={dishes7} />
      <Dishes images={dishes6} />
      <Dishes images={dishes5} />
      <Dishes images={dishes4} />
      <Dishes images={dishes3} />
      <Dishes images={dishes2} />
      <Dishes images={dishes1} />
    </section>
  </>
);

export default Bookshelf;
