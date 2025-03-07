import type { Preview } from '@storybook/react';

import '@/styles/globals.css';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import enMessages from '../messages/en.json';
import { fontSans } from '../src/config';
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
            <div className={fontSans.className}>
              <ToastProvider />
              <Story />
            </div>
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
