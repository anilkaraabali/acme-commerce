import type { GetServerSideProps } from 'next';

import { AccountPageProps } from '@/features/auth/pages/account/page';
import { LocaleType } from '@/types';
import { getMessages } from '@/utils';
import { getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]';

export const getServerSideProps = (async (ctx) => {
  const locale = ctx.locale as LocaleType;

  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      messages: await getMessages(locale),
      session,
    },
  };
}) satisfies GetServerSideProps<AccountPageProps>;

export { default } from '@/features/auth/pages/account/page';
