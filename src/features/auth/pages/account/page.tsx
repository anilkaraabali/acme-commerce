import { Button } from '@heroui/react';
import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { AbstractIntlMessages, useTranslations } from 'next-intl';

import { useAuth } from '../../providers/auth-provider';

interface AccountPageProps {
  messages: AbstractIntlMessages;
}

const AccountPage: NextPage<AccountPageProps> = () => {
  const t = useTranslations('Auth');
  const { user } = useAuth();

  const handleSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <div className='pt-8'>
      <div className='container flex flex-col items-start gap-4'>
        <h1>{t('account.welcome.title', { name: user?.name })}</h1>
        <Button color='danger' onPress={handleSignOut} variant='flat'>
          {t('signOut.cta')}
        </Button>
      </div>
    </div>
  );
};

export type { AccountPageProps };
export default AccountPage;
