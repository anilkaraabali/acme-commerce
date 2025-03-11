import type { GetServerSideProps } from 'next';

import { productService } from '@/features/product/services';
import { SearchPageProps } from '@/features/search/pages/page';
import { LocaleType } from '@/types';
import { getMessages, promiseAllSettled } from '@/utils';
import { getServerSession } from 'next-auth';

import { authOptions } from './api/auth/[...nextauth]';

export const getServerSideProps = (async (ctx) => {
  const locale = ctx.locale as LocaleType;

  const [searchResult, messages] = await promiseAllSettled([
    productService.fetchProducts('/kids/index'),
    getMessages(locale, ['Product']),
  ]);

  if (!searchResult.ok) {
    throw new Error('Failed to fetch product listing');
  }

  return {
    props: {
      messages,
      searchResult: searchResult.data,
      session: await getServerSession(ctx.req, ctx.res, authOptions),
    },
  };
}) satisfies GetServerSideProps<SearchPageProps>;

export { default } from '@/features/search/pages/page';
