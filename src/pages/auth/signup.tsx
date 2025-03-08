import type { GetServerSideProps } from 'next';

import { SignUpProps } from '@/features/auth/sign-up/Signup';
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
}) satisfies GetServerSideProps<SignUpProps>;

export { default } from '@/features/auth/sign-up/Signup';
