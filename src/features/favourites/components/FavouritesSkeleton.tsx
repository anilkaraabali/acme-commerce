import { Skeleton } from '@heroui/react';

const FavouritesSkeleton = () => (
  <div className='px-4'>
    <Skeleton className='mb-4 h-6 w-[240px] rounded-lg' />
    <Skeleton className='mb-12 h-7 w-full max-w-[700px] rounded-lg' />
    <Skeleton className='h-12 w-96 rounded-lg' />
  </div>
);

export { FavouritesSkeleton };
