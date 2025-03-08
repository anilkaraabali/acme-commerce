import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Link,
} from '@heroui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { LiaPlusSolid } from 'react-icons/lia';
import ReactStars from 'react-stars';

import { ProductReviewsCard } from './ProductReviewsCard';
import { ProductReviewsEmptyState } from './ProductReviewsEmptyState';
import { useProductReviews } from './ProductReviewsProvider';

interface ProductReviewsModalProps {
  isOpen: boolean;
  onAddClick: () => void;
  onOpenChange: () => void;
}

const ProductReviewsModal: FC<ProductReviewsModalProps> = ({
  isOpen,
  onAddClick,
  onOpenChange,
}) => {
  const t = useTranslations('Common');
  const { hasUserReviewed, ratingAverage, reviews } = useProductReviews();

  return (
    <Drawer
      data-testid='reviews-modal'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        {() => (
          <>
            <DrawerHeader className='flex flex-col gap-1'>
              {t('reviews.title')}
            </DrawerHeader>
            <DrawerBody>
              {reviews.length ? (
                <>
                  <div className='mb-4'>
                    <p className='mb-1 font-bold'>{ratingAverage.toFixed(1)}</p>
                    <div className='flex items-center justify-between gap-3'>
                      <ReactStars edit={false} value={ratingAverage} />
                      <p className='text-sm'>
                        {t('reviews.basedOnReviews', { count: reviews.length })}
                      </p>
                    </div>
                    <Link
                      as={NextLink}
                      className='w-full justify-end text-xs text-default-500'
                      color='foreground'
                      href='/customer-service/legal-and-privacy/reviews-terms-and-conditions'
                      size='sm'
                      target='_blank'
                      underline='always'
                    >
                      {t('reviews.legal')}
                    </Link>
                  </div>

                  {!hasUserReviewed && (
                    <Button
                      className='mb-4 self-end'
                      color='primary'
                      onPress={onAddClick}
                      startContent={<LiaPlusSolid size={18} />}
                      variant='flat'
                    >
                      {t('reviews.addComment.cta')}
                    </Button>
                  )}

                  <ul className='flex flex-col gap-10'>
                    {reviews.map((review) => (
                      <li className='border-t pt-10' key={review.id}>
                        <ProductReviewsCard review={review} />
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <ProductReviewsEmptyState onCtaClick={onAddClick} />
              )}
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export type { ProductReviewsModalProps };
export { ProductReviewsModal };
