import { LanguageSwitch } from '@/components/language-switch';
import { Link } from '@heroui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

const SignupHeader: FC = () => {
  const t = useTranslations('Auth');

  return (
    <header className='flex h-14 items-center justify-between gap-8 px-6 py-2'>
      <LanguageSwitch
        triggerButtonProps={{
          size: 'sm',
        }}
      />
      <div className='flex items-center gap-1'>
        <p className='hidden gap-1 text-sm text-default-500 sm:flex'>
          {t('signUp.prompt.question')}
        </p>
        <Link
          as={NextLink}
          color='foreground'
          href='/auth/signin'
          size='sm'
          underline='always'
        >
          {t('signUp.prompt.cta')}
        </Link>
      </div>
    </header>
  );
};

export { SignupHeader };
