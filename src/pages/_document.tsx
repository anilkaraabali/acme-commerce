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
        <Head />
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
