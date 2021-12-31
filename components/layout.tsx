import Head from 'next/head';
import Header from '@components/header';

type TLayoutProps = {
  children: React.ReactElement;
};

function Layout(props: TLayoutProps) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex items-center justify-center ">
        <main className="max-w-5xl mx-4 my-8 font-custom md:mx-16 xl:text-md print:text-sm">
          {props.children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
