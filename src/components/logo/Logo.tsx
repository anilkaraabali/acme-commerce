import clsx from 'clsx';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { ComponentPropsWithRef, forwardRef } from 'react';

interface LogoProps extends ComponentPropsWithRef<'svg'> {
  size?: 'lg' | 'md' | 'sm';
}

const Logo = forwardRef<SVGSVGElement, LogoProps>(
  ({ size = 'sm', ...props }, ref) => {
    const t = useTranslations('Common');

    const width = size === 'sm' ? 36 : size === 'md' ? 48 : 64;

    return (
      <NextLink
        aria-label={t('homepage.ariaLabel')}
        className='flex items-center justify-start gap-1'
        color='foreground'
        href='/'
        title={t('homepage.title')}
      >
        <svg
          fill='none'
          height={width}
          viewBox='0 0 32 32'
          width={width}
          {...props}
          ref={ref}
        >
          <path
            clipRule='evenodd'
            d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
            fill='currentColor'
            fillRule='evenodd'
          />
        </svg>
        <p
          className={clsx('font-bold text-inherit', {
            'text-2xl': size === 'md',
            'text-4xl': size === 'lg',
          })}
        >
          ACME
        </p>
      </NextLink>
    );
  }
);

export type { LogoProps };
export { Logo };
