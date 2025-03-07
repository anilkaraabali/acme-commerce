import type { GetServerSideProps } from 'next';

import { ProductDetailProps } from '@/features/product/layouts/ProductDetail';
import { productService } from '@/features/product/services';
import { LocaleType } from '@/types';
import { getMessages, promiseAllSettled } from '@/utils';
import { getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]';

export const getServerSideProps = (async (ctx) => {
  const locale = ctx.locale as LocaleType;
  const { query } = ctx;

  if (!query.slug) {
    return {
      notFound: true,
    };
  }

  if (!query.pid) {
    return {
      notFound: true,
    };
  }

  const [detailResult, messages] = await promiseAllSettled([
    productService.fetchProductById(query.pid as string),
    getMessages(locale, ['Product']),
  ]);

  if (!detailResult.ok) {
    throw new Error('Failed to fetch product detail');
  }

  return {
    props: {
      detailResult: detailResult.data,
      messages,
      session: await getServerSession(ctx.req, ctx.res, authOptions),
    },
  };
}) satisfies GetServerSideProps<ProductDetailProps>;

export { default } from '@/features/product/layouts/ProductDetail';
