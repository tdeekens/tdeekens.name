import Head from 'next/head';
import Text from '@components/text';
import Track from '@components/track';

const tracks = [
  { artist: 'Causa Sui', song: 'Red Valley', id: 'lr4LVeNmIbk' },
  { artist: 'Colour Haze', song: 'Aquamaria', id: 'K7QNffGb86I' },
  { artist: 'Lambert', song: 'Awake', id: 'RoCH5drfOlY' },
  {
    artist: 'Psychedelic Porn Crumpets',
    song: 'Found God In A Tomato',
    id: 'T85UxlgArXQ',
  },
  {
    artist: 'Benjamin Booker',
    song: 'Have you seen my son?',
    id: 'K3lZvjs3LwY',
  },
  { artist: 'Camera', song: 'Ausland', id: '0xoLvYrOLyk' },
  { artist: 'Cloud Nothings', song: 'Psychic Trauma', id: 'jzzDJlFQQy4' },
  { artist: 'The Undertones', song: 'Teenage Kicks', id: 'PinCg7IGqHg' },
  { artist: 'Dinosaur Jr.', song: 'I Ran Away', id: 'JGXxFSWewmw' },
  {
    artist: 'Delvon Lamarr Organ Trio',
    song: 'Inner City Blues',
    id: 'MWzg9m4YOOg',
  },
  { artist: 'Courtney Barnett', song: 'Avant Gardener', id: 'RKcnMxdMYI4' },
  { artist: 'Rotor', song: 'Costa Verde', id: 'U8utTd7CvOA' },
  { artist: 'Grandbrothers', song: 'Ezra was right', id: 'YZSTTMPHQo0' },
  { artist: 'Blues Pills', song: 'Time Is Now', id: 'fw9-h90p3Jo' },
  { artist: 'Kadavar', song: 'Come Back Life', id: '4xgi91s7zf8' },
  { artist: 'Protomartyr', song: 'Pontiac 87', id: 'kigTkkwKpY' },
  { artist: 'Girls Names', song: 'Hypnotic Regression', id: 'Hheb-HCRHTk' },
  {
    artist: 'Portugal. The Man',
    song: 'Creep In A T-Shirt',
    id: 'Dk3boYl6qV4',
  },
  { artist: 'Pixies', song: 'Gouge Away', id: 'KO2HP8msjC0' },
  { artist: 'Foals', song: 'Late Night', id: 'AMwt5sTlRuE' },
  { artist: 'Alabama Shakes', song: 'Hold On', id: 'Le-3MIBxQTw' },
  { artist: 'Death', song: 'Keep on Knocking', id: 'klCL0krHKqc' },
  { artist: 'Scout Niblett', song: 'Gun', id: 'U_EYmtHbiZ0' },
  { artist: 'Mogwai', song: 'San Pedro', id: 'ZTscuwGViRM' },
  { artist: 'Interpol', song: 'Say Hello to the Angels', id: 'ueHNvHbvtRE' },
  { artist: 'The Babies', song: 'Get Lost', id: 'y1NP1UaNwkE' },
  {
    artist: 'The Disclosure Project',
    song: 'Them Were The Days',
    id: 'uDx5H2dwjnQ',
  },
  { artist: 'Sonic Youth', song: 'Stones', id: 'RIT_-0FUnDI' },
  { artist: 'DIIV', song: 'Doused', id: 'KI79GPXAICM' },
  { artist: 'Two Gallants', song: 'Halcyon Days', id: 'ZUFIbAG1ePI' },
  {
    artist: 'The Black Keys',
    song: 'Little Black Submarines',
    id: 'MPp4_e33o1M',
  },
  { artist: 'Waters', song: 'O Holy Break Of Day', id: '0rM4OBEDQ7k' },
  { artist: 'Joy Division', song: 'Disorder', id: '7lIQhXik--w' },
  { artist: 'Johnossi', song: 'Bobby', id: 'GkV16T8cAgg' },
  { artist: 'Graveyard', song: 'Goliath', id: 'k8jqUHYiSl0' },
  { artist: 'Grizzly Bear', song: 'Yet Again', id: 'bteY_fs3Y18' },
  { artist: 'Alice in Chains', song: 'Rooster', id: 'uAE6Il6OTcs' },
  {
    artist: 'The Sunshine Underground',
    song: "I Ain't Losing Any Sleep",
    id: 'eHnyJj98tT0',
  },
  { artist: 'Movits!', song: 'Fel Del Av Gården', id: 'LnaeImQ0TSg' },
  { artist: 'Velvet Two Stripes', song: 'Lizard Queen', id: 'EY0kVN-X42U' },
  { artist: 'Black Pistol Fire', song: 'Without Love', id: 'XJ_gxWL6gqk' },
  { artist: 'Snarky Puppy', song: 'Lingus', id: 'L_XJ_s5IsQc' },
  { artist: 'Soundgarden', song: 'Spoonman', id: 'T0_zzCLLRvE' },
  { artist: 'Pond', song: 'Eye Pattern Blindness', id: 'tR9QIU4vGsI' },
  { artist: 'Fleetwood Mac', song: 'The Chain', id: 'kBYHwH1Vb-c' },
  {
    artist: 'Explosions in the Sky',
    song: 'Last Known Surroundings',
    id: 'yyXWTEDW7is',
  },
  {
    artist: 'Japandroids',
    song: 'The Nights of Wine and Roses',
    id: 'e1BKRAZVhRA',
  },
  { artist: 'The Rifles', song: 'Fat Cat', id: 'RKZwj5eIz4I' },
  { artist: 'Yodelice', song: 'le blues sans nom', id: 'sK35sGbvaFM' },
  { artist: 'The Whitest Boy Alive', song: 'Inflation', id: 'P-RdHesQs4I' },
  { artist: 'Bass Drum of Death', song: 'Get Found', id: '1-sT-fUnxiI' },
  { artist: 'Gary Clark Jr.', song: 'Bright Lights', id: 'JxKXZwP0oGo' },
  { artist: 'Dusty Springfield', song: 'Spooky', id: 'f7QzxYAjgNc' },
  {
    artist: 'The White Stripes',
    song: "Let's Build A Home",
    id: 'PIFfZfoUEaM',
  },
  {
    artist: 'Black Joe Lewis and the Honeybears',
    song: "Livin' in the Jungle",
    id: 'Ge4xw_zSl94',
  },
  { artist: 'Walk The Moon', song: 'Anna Sun', id: 'ZIJE7z57AnQ' },
  { artist: 'WU LYF', song: 'Spitting Blood', id: 'EjXRb_hfJrU' },
  { artist: 'Yuck', song: 'Holing Out', id: 'kUvPeNY6dZQ' },
  { artist: 'GoGo Pengiun', song: 'Transient State  ', id: '65SUzhIVksg' },
  { artist: 'Wes Montgomery', song: 'A Day In The Life', id: 'sjHiSePn1ts' },
  { artist: 'The Castells', song: 'Knnes', id: '4a5Dz1x-UBU' },
];

const Jukebox = () => (
  <>
    <Head>
      <title>Tobias Deekens (@tdeekens) - Jukebox</title>
    </Head>

    <Text.Headline as="h1">Jukebox</Text.Headline>

    <Text.Paragraph>
      Music I liked at some point in the last five plus years. Sparing you my
      intermezzo with house and boy groups.
    </Text.Paragraph>

    <section className="grid gap-4 my-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {tracks.map((track) => (
        <Track key={track.id} {...track} />
      ))}
    </section>
  </>
);

export default Jukebox;
