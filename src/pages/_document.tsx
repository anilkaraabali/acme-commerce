import { fontSans } from '@/config/fonts';
import clsx from 'clsx';
import Document, {
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

export default class MyDocument extends Document<DocumentInitialProps> {
  render() {
    return (
      <Html lang='en' style={{ scrollBehavior: 'smooth' }}>
        <Head>
          <link
            href='/favicon/favicon-16x16.png'
            rel='icon'
            sizes='16x16'
            type='image/png'
          />
          <link
            href='/favicon/favicon-32x32.png'
            rel='icon'
            sizes='32x32'
            type='image/png'
          />
          <link
            href='/favicon/favicon.ico'
            rel='shortcut icon'
            sizes='16x16 32x32 48x48'
            type='image/x-icon'
          />
          <link
            href='/favicon/apple-touch-icon.png'
            rel='apple-touch-icon'
            sizes='180x180'
            type='image/png'
          />
          <link href='/favicon/site.webmanifest' rel='manifest' />
        </Head>
        <body
          className={clsx(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
