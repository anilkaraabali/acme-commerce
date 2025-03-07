import { LocaleType } from '@/types';
import enMessages from 'messages/en.json';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ReactNode, useEffect, useState } from 'react';

const withIntl =
  (locale: LocaleType = 'en') =>
  ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<AbstractIntlMessages | null>(null);

    useEffect(() => {
      const loadMessages = async () => {
        try {
          setMessages(enMessages);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error loading messages:', error);
        }
      };

      loadMessages();
    }, []);

    if (!messages) {
      return <div>Loading...</div>;
    }

    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    );
  };

export { withIntl };
