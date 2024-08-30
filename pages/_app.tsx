import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';

import '@styles/tailwind.css';

import Layout from '@components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <SpeedInsights />
    </Layout>
  );
}
export default MyApp;
