import type { GetServerSideProps } from 'next';

import { HomePageProps } from '@/features/home/pages/page';
import { LocaleType } from '@/types';
import { getMessages } from '@/utils';
import { getServerSession } from 'next-auth';

import { authOptions } from './api/auth/[...nextauth]';

export const getServerSideProps = (async (ctx) => {
  const locale = ctx.locale as LocaleType;

  return {
    props: {
      messages: await getMessages(locale, ['Home']),
      session: await getServerSession(ctx.req, ctx.res, authOptions),
    },
  };
}) satisfies GetServerSideProps<HomePageProps>;

export { default } from '@/features/home/pages/page';
