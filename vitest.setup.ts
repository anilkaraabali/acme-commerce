import '@testing-library/jest-dom';
import enMessages from 'messages/en.json';
import nextRouterMock from 'next-router-mock';
import { vi } from 'vitest';

vi.mock('@/utils/get-messages', () => ({
  getMessages: vi.fn(async () => enMessages),
}));

vi.mock('next/router', () => nextRouterMock);

vi.mock('next-intl', () => ({
  NextIntlProvider: ({ children }: { children: React.ReactNode }) => children,
  useLocale: () => 'en',
  useTranslations: () => (key: string) => key,
}));
