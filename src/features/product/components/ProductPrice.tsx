import clsx from 'clsx';
import { FC } from 'react';

import { Product } from '../types';

interface ProductPriceProps {
  classNames?: {
    base?: string;
  };
  price: Product['price'];
  salePrice: Product['salePrice'];
}

const ProductPrice: FC<ProductPriceProps> = ({
  classNames,
  price,
  salePrice,
}) => (
  <p className={clsx('flex items-center gap-1 text-sm', classNames?.base)}>
    {salePrice && (
      <span className='font-bold text-red-500' data-testid='product-sale-price'>
        {salePrice.currency}
        {salePrice.value}
      </span>
    )}
    <span
      className={clsx({
        'font-bold': !salePrice,
        'line-through': salePrice,
      })}
      data-testid='product-price'
    >
      {price.currency}
      {price.value}
    </span>
  </p>
);

export type { ProductPriceProps };
export { ProductPrice };
