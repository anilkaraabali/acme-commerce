import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface ProductReviewsEmptyStateProps {
  onCtaClick: () => void;
}

const ProductReviewsEmptyState: FC<ProductReviewsEmptyStateProps> = ({
  onCtaClick,
}) => {
  const t = useTranslations('Common.reviews');

  return (
    <div className='text-center'>
      <div>
        <h4 className='font-bold'>{t('noReviews.title')}</h4>
        <p className='mt-2 text-sm'>{t('noReviews.description')}</p>
      </div>
      <Button
        className='mt-6'
        color='primary'
        onPress={onCtaClick}
        variant='flat'
      >
        {t('noReviews.cta')}
      </Button>
    </div>
  );
};

export type { ProductReviewsEmptyStateProps };
export { ProductReviewsEmptyState };
