import '@testing-library/jest-dom';
import enMessages from 'messages/en.json';
import nextRouterMock from 'next-router-mock';

jest.mock('@/utils/get-messages', () => ({
  getMessages: jest.fn(async () => enMessages),
}));

jest.mock('next/router', () => nextRouterMock);

jest.mock('next-intl', () => ({
  NextIntlProvider: ({ children }: { children: React.ReactNode }) => children,
  useLocale: () => 'en',
  useTranslations: () => (key: string) => key,
}));
