import { Skeleton } from '@heroui/react';

const ProductReviewsSkeleton = () => (
  <div className='mb-2 flex items-center justify-between gap-3'>
    <Skeleton className='h-[40px] w-[120px] rounded-lg' />
    <Skeleton className='h-6 w-[108px] rounded-lg' />
  </div>
);

export { ProductReviewsSkeleton };
