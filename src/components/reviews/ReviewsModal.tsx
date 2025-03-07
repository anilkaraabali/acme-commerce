import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Link,
} from '@heroui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import ReactStars from 'react-stars';

import { ReviewsCard } from './ReviewsCard';
import { Review } from './types';

interface ReviewsModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  reviews: Review[];
}

const ReviewsModal: FC<ReviewsModalProps> = ({
  isOpen,
  onOpenChange,
  reviews,
}) => {
  const t = useTranslations('Common');

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {() => (
          <>
            <DrawerHeader className='flex flex-col gap-1'>
              {t('reviews.title')}
            </DrawerHeader>
            <DrawerBody>
              <div className='mb-6'>
                <p className='mb-1 font-bold'>{averageRating.toFixed(1)}</p>
                <div className='flex items-center justify-between gap-3'>
                  <ReactStars
                    color1='#000'
                    count={5}
                    edit={false}
                    size={16}
                    value={averageRating}
                  />
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
              <ul className='flex flex-col gap-10'>
                {reviews.map((review) => (
                  <li className='border-t pt-10' key={review.id}>
                    <ReviewsCard review={review} />
                  </li>
                ))}
              </ul>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export type { ReviewsModalProps };
export { ReviewsModal };
