import { Button } from '@heroui/react';
import { signOut } from 'next-auth/react';
import { AbstractIntlMessages, useTranslations } from 'next-intl';

import { useAuth } from '../AuthProvider';

interface AccountProps {
  messages: AbstractIntlMessages;
}

function Account() {
  const t = useTranslations('Auth');
  const { user } = useAuth();

  return (
    <div className='pt-8'>
      <div className='container flex flex-col items-start gap-4'>
        <h1>{t('account.welcome.title', { name: user?.name })}</h1>
        <Button
          color='danger'
          onPress={() =>
            signOut({
              callbackUrl: '/',
            })
          }
          variant='flat'
        >
          {t('signOut.cta')}
        </Button>
      </div>
    </div>
  );
}

export type { AccountProps };
export default Account;
