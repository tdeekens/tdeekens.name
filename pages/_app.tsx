import { useCallback, useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';

import '@styles/tailwind.css';

import Layout from '@components/layout';
import ShortcutsHelp from '@components/shortcuts-help';
import { useShortcuts } from '@lib/use-shortcuts';

function MyApp({ Component, pageProps }: AppProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const openHelp = useCallback(() => setHelpOpen(true), []);
  const closeHelp = useCallback(() => setHelpOpen(false), []);

  useShortcuts(openHelp);

  return (
    <>
      <SpeedInsights />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ShortcutsHelp open={helpOpen} onClose={closeHelp} />
    </>
  );
}
export default MyApp;
