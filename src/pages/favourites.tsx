import type { GetServerSideProps } from 'next';

import { FavouritesPageProps } from '@/features/favourites/pages/page';
import { LocaleType } from '@/types';
import { getMessages } from '@/utils';
import { getServerSession } from 'next-auth';

import { authOptions } from './api/auth/[...nextauth]';

export const getServerSideProps = (async (ctx) => {
  const locale = ctx.locale as LocaleType;

  return {
    props: {
      messages: await getMessages(locale, ['Product', 'Favourites']),
      session: await getServerSession(ctx.req, ctx.res, authOptions),
    },
  };
}) satisfies GetServerSideProps<FavouritesPageProps>;

export { default } from '@/features/favourites/pages/page';
