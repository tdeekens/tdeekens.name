import Layout from '@components/layout';
import ShortcutsHelp from '@components/shortcuts-help';
import { useShortcuts } from '@lib/use-shortcuts';
import { useThemeSync } from '@lib/use-theme';

import '@styles/tailwind.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';
import { useCallback, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const openHelp = useCallback(() => setHelpOpen(true), []);
  const closeHelp = useCallback(() => setHelpOpen(false), []);

  useShortcuts(openHelp);
  useThemeSync();

  return (
    <>
      <SpeedInsights />
      <Layout onOpenShortcuts={openHelp}>
        <Component {...pageProps} />
      </Layout>
      <ShortcutsHelp open={helpOpen} onClose={closeHelp} />
    </>
  );
}
export default MyApp;
