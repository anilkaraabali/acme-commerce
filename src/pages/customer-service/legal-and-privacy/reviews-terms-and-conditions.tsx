import type { GetServerSideProps } from 'next';

import { PdfPageProps } from '@/features/pdf/pages/page';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { LocaleType } from '@/types';
import { getMessages } from '@/utils';
import { getServerSession } from 'next-auth';

export const getServerSideProps = (async (ctx) => {
  const locale = ctx.locale as LocaleType;

  return {
    props: {
      fileName:
        'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf',
      messages: await getMessages(locale),
      session: await getServerSession(ctx.req, ctx.res, authOptions),
      title: 'Terms & Conditions Customer Rate & Review',
    },
  };
}) satisfies GetServerSideProps<PdfPageProps>;

export { default } from '@/features/pdf/pages/page';
