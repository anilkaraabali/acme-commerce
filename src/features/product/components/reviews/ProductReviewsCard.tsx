import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import ReactStars from 'react-stars';

import { ProductReview } from '../../types';

interface ProductReviewsCardProps {
  disableToggle?: boolean;
  maxLength?: number;
  review: ProductReview;
}

const ProductReviewsCard: FC<ProductReviewsCardProps> = ({
  disableToggle = false,
  maxLength = 128,
  review,
}) => {
  const t = useTranslations('Common');

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    if (!disableToggle) {
      setIsExpanded((prev) => !prev);
    }
  };

  // If disableToggle is true, we want to show the full content, else we crop based on maxLength
  const contentToShow =
    disableToggle || isExpanded
      ? review.content
      : review.content.length > maxLength
        ? review.content.substring(0, maxLength) + '...'
        : review.content;

  return (
    <div className='flex flex-col items-start gap-4' data-testid='reviews-card'>
      <div className='flex w-full items-center justify-between gap-3'>
        <ReactStars edit={false} value={review.rating} />
        <p className='text-sm'>
          {dayjs(review.createdAt).format('DD MMM YYYY')}
        </p>
      </div>
      <p className='text-sm'> {contentToShow}</p>
      {review.content.length > maxLength && !disableToggle && (
        <button
          className='text-sm uppercase text-foreground underline'
          data-testid='reviews-card-toggle'
          onClick={toggleContent}
        >
          {isExpanded ? t('cta.showLess') : t('cta.showMore')}
        </button>
      )}
    </div>
  );
};

export { ProductReviewsCard };
