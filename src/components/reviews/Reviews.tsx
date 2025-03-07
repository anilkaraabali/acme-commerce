import { usePageIsLoading } from '@/hooks';
import { Button, Link, Skeleton, useDisclosure } from '@heroui/react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Review } from './types';

interface ReviewsProps {
  average: number;
  classNames?: {
    base?: string;
  };
  count: number;
  reviews: Review[];
}

const ReviewsModalAsync = dynamic(
  () => import('./ReviewsModal').then((mod) => mod.ReviewsModal),
  { ssr: false }
);
const ReactStars = dynamic(() => import('react-stars'), { ssr: false });

const Reviews: FC<ReviewsProps> = ({ average, classNames, count, reviews }) => {
  const t = useTranslations('Common');
  const pageIsLoading = usePageIsLoading();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        onPress={onOpen}
        underline='always'
        variant='light'
      >
        {t('reviews.label', { count })}
      </Link>
      <button className='flex items-center gap-2' onClick={onOpen}>
        {pageIsLoading ? (
          <Skeleton className='h-6 w-20 rounded-lg' />
        ) : (
          <ReactStars
            color1='#000'
            count={5}
            data-testid='reviews-stars'
            edit={false}
            size={16}
            value={average}
          />
        )}
        <span className='text-sm' data-testid='reviews-rating'>
          {average.toFixed(1)}
        </span>
      </button>
      {isOpen && (
        <ReviewsModalAsync
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          reviews={reviews}
        />
      )}
    </div>
  );
};

export type { ReviewsProps };
export { Reviews };
