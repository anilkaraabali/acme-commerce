import type { GetServerSideProps } from 'next';

import { ProductFavouritesProps } from '@/features/product/pages';
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
}) satisfies GetServerSideProps<ProductFavouritesProps>;

export { default } from '@/features/product/pages/ProductFavourites';
