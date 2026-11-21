import { THEME_COLORS, themeInitScript } from '@lib/theme';
import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content={THEME_COLORS.light} />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Sets data-theme before first paint to avoid a flash of the wrong theme. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </body>
    </Html>
  );
}
