import { USER_FAVORITES_STORAGE_KEY } from '@/features/auth';
import { LayoutProps } from '@/types';
import { Button } from '@heroui/react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { useReadLocalStorage } from 'usehooks-ts';

import { ProductReview } from '../types';

interface ProductFavouritesProps extends LayoutProps {}

const ProductFavourites: NextPage<ProductFavouritesProps> = () => {
  const t = useTranslations('Favourites');
  const userFavs = useReadLocalStorage<ProductReview[]>(
    USER_FAVORITES_STORAGE_KEY
  );

  return (
    <main>
      <h1 className='page-title'>{t('title')}</h1>
      {!userFavs?.length && (
        <div className='px-4'>
          <h2 className='mb-4 font-bold uppercase'>{t('empty.title')}</h2>
          <p className='mb-12 pb-2 text-sm'>{t('empty.description')}</p>
          <Button
            as={NextLink}
            color='primary'
            href='/products'
            size='lg'
            variant='ghost'
          >
            {t('empty.cta')}
          </Button>
        </div>
      )}
    </main>
  );
};

export type { ProductFavouritesProps };
export default ProductFavourites;
