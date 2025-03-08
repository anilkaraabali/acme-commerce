import clsx from 'clsx';
import { FC } from 'react';

interface ProductDiscountBadgeProps {
  classNames?: {
    badge?: string;
    base?: string;
  };
  discountRate: string;
}

const ProductDiscountBadge: FC<ProductDiscountBadgeProps> = ({
  classNames,
  discountRate,
}) => (
  <div className={classNames?.base}>
    <span
      className={clsx(
        'bg-black px-2 py-1 text-xs text-white',
        classNames?.badge
      )}
      data-testid='product-discount'
    >
      {discountRate}
    </span>
  </div>
);

export type { ProductDiscountBadgeProps };
export { ProductDiscountBadge };
