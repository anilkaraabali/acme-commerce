import type { GetServerSideProps } from 'next';

import { SigninProps } from '@/features/auth/sign-in/Signin';
import { LocaleType } from '@/types';
import { getMessages, getReferer } from '@/utils';

export const getServerSideProps = (async (ctx) => {
  const locale = ctx.locale as LocaleType;

  return {
    props: {
      messages: await getMessages(locale, ['Auth']),
      referer: getReferer({
        headers: ctx.req.headers,
        redirect: '/',
      }),
    },
  };
}) satisfies GetServerSideProps<SigninProps>;

export { default } from '@/features/auth/sign-in/Signin';
