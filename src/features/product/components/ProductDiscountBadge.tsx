import clsx from 'clsx';
import { FC } from 'react';

interface ProductDiscountBadgeProps {
  classNames?: {
    base?: string;
  };
  discountRate: string;
}

const ProductDiscountBadge: FC<ProductDiscountBadgeProps> = ({
  classNames,
  discountRate,
}) => (
  <span
    className={clsx('bg-black px-2 py-1 text-xs text-white', classNames?.base)}
    data-testid='product-discount'
  >
    {discountRate}
  </span>
);

export type { ProductDiscountBadgeProps };
export { ProductDiscountBadge };
