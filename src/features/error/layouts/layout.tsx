import { DynamicTranslationKey } from '@/types';
import { Button } from '@heroui/react';
import { ErrorProps as NextErrorProps } from 'next/error';
import Image from 'next/image';
import NextLink from 'next/link';
import { AbstractIntlMessages, useTranslations } from 'next-intl';
import { FC } from 'react';
import { LiaArrowRightSolid } from 'react-icons/lia';

interface ErrorLayoutProps extends NextErrorProps {
  detail?: string;
  messages: AbstractIntlMessages;
}

const ErrorLayout: FC<ErrorLayoutProps> = (props) => {
  const t = useTranslations('Error');

  return (
    <div className='pt-24'>
      <div className='container flex flex-col items-center justify-center text-center'>
        <Image
          alt='Error illustration'
          className='mb-6'
          height={196}
          src='/illustrations/error.svg'
          width={396}
        />
        <h1 className='text-2xl' data-testid='error-title'>
          {t(`${props.statusCode}.title` as DynamicTranslationKey)}
        </h1>
        <p className='mt-2 text-default-500' data-testid='error-detail'>
          {t(`${props.statusCode}.detail` as DynamicTranslationKey)}
        </p>
        <Button
          as={NextLink}
          className='mt-6'
          color='primary'
          data-testid='error-cta'
          endContent={<LiaArrowRightSolid size={20} />}
          href='/'
          variant='shadow'
        >
          {t('cta')}
        </Button>
      </div>
    </div>
  );
};

export type { ErrorLayoutProps };
export { ErrorLayout };
