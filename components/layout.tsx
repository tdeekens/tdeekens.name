import Header from '@components/header';
import PageControls from '@components/page-controls';
import { Analytics } from '@vercel/analytics/next';
import Head from 'next/head';

type TLayoutProps = {
  children: React.ReactElement;
  onOpenShortcuts: () => void;
};

function Layout(props: TLayoutProps) {
  return (
    <div className="relative">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageControls onOpenShortcuts={props.onOpenShortcuts} />
      <Header />
      <div className="flex items-center justify-center ">
        <main className="max-w-5xl mx-4 my-8 font-custom md:mx-16 xl:text-md print:text-sm">
          {props.children}
        </main>
      </div>
      <Analytics />
    </div>
  );
}

export default Layout;
