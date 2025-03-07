import Image from 'next/image';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

const Hero: FC = () => {
  const t = useTranslations('Home.hero');

  return (
    <section className='relative' id='hero'>
      <h1 className='clip-rect-0 absolute -m-px size-px overflow-hidden p-0'>
        {t('title')}
      </h1>
      <NextLink
        aria-label={t('shopNow')}
        href='/ladies'
        style={{ maxHeight: 'calc(-64px + 100svh)' }}
      >
        <Image
          alt='Hero Image'
          height='2814'
          objectFit='cover'
          priority
          src='/images/home/women-startpage.avif'
          width='5000'
        />
      </NextLink>
    </section>
  );
};

export { Hero };
