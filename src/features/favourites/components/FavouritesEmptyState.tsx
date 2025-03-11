import { Button } from '@heroui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';

const FavouritesEmptyState = () => {
  const t = useTranslations('Favourites');

  return (
    <div className='px-4'>
      <h2 className='mb-4 font-bold uppercase'>{t('empty.title')}</h2>
      <p className='mb-12 pb-2 text-sm'>{t('empty.description')}</p>
      <Button as={NextLink} color='primary' href='/' size='lg' variant='ghost'>
        {t('empty.cta')}
      </Button>
    </div>
  );
};

export { FavouritesEmptyState };
