import Head from 'next/head';

type TLayoutProps = {
  children: React.ReactElement;
};

function Layout(props: TLayoutProps) {
  return (
    <div className="flex justify-center items-center">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-8 mx-4 md:mx-16 font-mono xl:text-sm print:text-sm max-w-6xl">
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
