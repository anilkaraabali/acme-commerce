import { LanguageSwitch } from '@/components/language-switch';
import { Logo } from '@/components/logo';
import { Link } from '@heroui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

const SigninHeader: FC = () => {
  const t = useTranslations('Auth');

  return (
    <header>
      <div className='flex h-14 items-center justify-between gap-8'>
        <Logo />
        <div className='flex items-center gap-4 md:gap-8'>
          <div>
            <p className='flex gap-1'>
              <span className='hidden text-sm text-default-600 lg:flex'>
                {t('signIn.prompt.question')}
              </span>
              <Link
                as={NextLink}
                className='text-nowrap'
                color='foreground'
                href='/auth/signup'
                size='sm'
                underline='always'
              >
                {t('signIn.prompt.cta')}
              </Link>
            </p>
          </div>
          <LanguageSwitch
            triggerButtonProps={{
              size: 'sm',
            }}
          />
        </div>
      </div>
    </header>
  );
};

export { SigninHeader };
