import { useAuth } from '@/features/auth';
import { Button, Link, useDisclosure } from '@heroui/react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { FC, useCallback } from 'react';
import ReactStars from 'react-stars';

import { useProductReviews } from './ProductReviewsProvider';

const LazyProductReviewsFormModal = dynamic(
  () =>
    import('./ProductReviewsFormModal').then(
      (mod) => mod.ProductReviewsFormModal
    ),
  { ssr: false }
);
const LazyProductReviewsModal = dynamic(
  () => import('./ProductReviewsModal').then((mod) => mod.ProductReviewsModal),
  { ssr: false }
);

interface ProductReviewsProps {
  classNames?: {
    base?: string;
  };
  productId: string;
}

const ProductReviews: FC<ProductReviewsProps> = ({ classNames, productId }) => {
  const t = useTranslations('Common');
  const { openAuthModal, user } = useAuth();
  const { ratingAverage, reviews } = useProductReviews();

  const {
    isOpen: isReviewsModalOpen,
    onOpen: onReviewsModalOpen,
    onOpenChange: onReviewsModalChange,
  } = useDisclosure();
  const {
    isOpen: isReviewFormOpen,
    onOpen: onReviewFormOpen,
    onOpenChange: onReviewFormChange,
  } = useDisclosure();

  const handleAddClick = useCallback(() => {
    if (!user) {
      openAuthModal();
    } else {
      onReviewFormOpen();
      onReviewsModalChange();
    }
  }, [onReviewFormOpen, onReviewsModalChange, openAuthModal, user]);

  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-4',
        classNames?.base
      )}
    >
      <Link
        as={Button}
        color='foreground'
        onPress={onReviewsModalOpen}
        underline='always'
        variant='light'
      >
        {t('reviews.label', { count: reviews.length })}
      </Link>
      {reviews.length > 0 && (
        <button
          className='flex items-center gap-2'
          onClick={onReviewsModalOpen}
        >
          <ReactStars
            data-testid='reviews-stars'
            edit={false}
            value={ratingAverage}
          />
          <span className='text-sm' data-testid='reviews-rating'>
            {ratingAverage.toFixed(1)}
          </span>
        </button>
      )}
      {isReviewsModalOpen && (
        <LazyProductReviewsModal
          isOpen={isReviewsModalOpen}
          onAddClick={handleAddClick}
          onOpenChange={onReviewsModalChange}
        />
      )}
      {isReviewFormOpen && (
        <LazyProductReviewsFormModal
          isOpen={isReviewFormOpen}
          onOpenChange={onReviewFormChange}
          productId={productId}
        />
      )}
    </div>
  );
};

export type { ProductReviewsProps };
export { ProductReviews };
