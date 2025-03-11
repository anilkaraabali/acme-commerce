import type { GetServerSideProps } from 'next';

import { SignInPageProps } from '@/features/auth/pages/sign-in/page';
import { LocaleType } from '@/types';
import { getMessages, getReferer } from '@/utils';
import { getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]';

export const getServerSideProps = (async (ctx) => {
  const locale = ctx.locale as LocaleType;

  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      messages: await getMessages(locale),
      referer: getReferer({
        headers: ctx.req.headers,
        redirect: '/',
      }),
    },
  };
}) satisfies GetServerSideProps<SignInPageProps>;

export { default } from '@/features/auth/pages/sign-in/page';
