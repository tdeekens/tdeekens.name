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
      <div className="flex justify-center items-center ">
        <main className="my-8 mx-4 md:mx-16 font-mono xl:text-sm print:text-sm max-w-6xl">
          {props.children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
