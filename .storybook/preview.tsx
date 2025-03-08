import type { Preview } from '@storybook/react';

import '@/styles/globals.css';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import enMessages from '../messages/en.json';
import { fontSans } from '../src/config';
import { AuthProvider } from '../src/features/auth';
import './styles.css';
import theme from './theme';

const preview: Preview = {
  decorators: [
    (Story, args) => {
      const locale = args.globals.locale;

      return (
        <HeroUIProvider labelPlacement='inside' spinnerVariant='simple'>
          <NextIntlClientProvider
            locale={locale}
            messages={enMessages}
            timeZone='Europe/Istanbul'
          >
            <SessionProvider>
              <div className={fontSans.className}>
                <AuthProvider>
                  <ToastProvider />
                  <Story />
                </AuthProvider>
              </div>
            </SessionProvider>
          </NextIntlClientProvider>
        </HeroUIProvider>
      );
    },
  ],
  globalTypes: {
    locale: {
      defaultValue: 'en',
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [{ right: '🇺🇸', title: 'English', value: 'en' }],
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme,
    },
    nextjs: {
      appDirectory: false,
    },
  },
  tags: ['autodocs'],
};

export default preview;
