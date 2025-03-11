import { useAuth } from '@/features/auth';
import { Button, Link, useDisclosure } from '@heroui/react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { FC, useCallback } from 'react';
import ReactStars from 'react-stars';
import { useLocalStorage } from 'usehooks-ts';

import { PRODUCT_REVIEWS_STORAGE_KEY } from '../constants/reviews-key.constant';
import { useProductReviews } from '../providers/review-provider';
import { ProductReviewsMap } from '../types';

const LazyReviewForm = dynamic(
  () => import('@/components/reviews').then((mod) => mod.ReviewForm),
  { ssr: false }
);
const LazyReviewsModal = dynamic(
  () => import('@/components/reviews').then((mod) => mod.ReviewsModal),
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
  const [, setReviews] = useLocalStorage<ProductReviewsMap>(
    PRODUCT_REVIEWS_STORAGE_KEY,
    {}
  );

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

  const handleFormSubmit = (data: { comment: string; rating: number }) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [productId]: [
        ...(prevReviews[productId] || []),
        {
          content: data.comment,
          createdAt: new Date().toISOString(),
          id: crypto.randomUUID(),
          productId,
          rating: data.rating,
          userId: user!.id,
        },
      ],
    }));
  };

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
        <LazyReviewsModal
          isOpen={isReviewsModalOpen}
          onAddClick={handleAddClick}
          onOpenChange={onReviewsModalChange}
          reviews={reviews}
        />
      )}
      {isReviewFormOpen && (
        <LazyReviewForm
          isOpen={isReviewFormOpen}
          onOpenChange={onReviewFormChange}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export type { ProductReviewsProps };
export { ProductReviews };
