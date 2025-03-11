import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Product } from '../../types';

interface ProductGridSizesProps {
  onSelectSize: (id: string) => void;
  selectedSizeId: string;
  sizes: Product['variants']['colors'][0]['sizes'];
}

const ProductGridSizes: FC<ProductGridSizesProps> = ({
  onSelectSize,
  selectedSizeId,
  sizes,
}) => {
  const t = useTranslations('Product');

  const isOutOfStock = sizes.every((size) => size.quantity === 0);
  const selectedSize = sizes.find((size) => size.id === selectedSizeId);

  return (
    <div
      className='mb-4 flex flex-col gap-4'
      data-testid='product-size-selector'
    >
      <div className='flex items-center justify-between gap-3'>
        <h4 className='text-sm uppercase'>
          {selectedSize
            ? t('variants.selectedSize', { size: selectedSize.name })
            : t('variants.size')}
        </h4>
        {isOutOfStock && <p className='text-sm'>{t('outOfStock')}</p>}
      </div>
      <ul className='grid grid-cols-5 gap-px'>
        {sizes.map((size) => (
          <li key={size.name}>
            <button
              className={clsx(
                'relative z-10 h-14 w-full py-2 outline outline-1 outline-default-300 transition-all duration-200 hover:z-20 hover:bg-default-100 hover:outline-foreground',
                {
                  'z-20 outline-foreground': size.id === selectedSizeId,
                }
              )}
              data-testid='product-size'
              disabled={size.quantity === 0}
              onClick={() => onSelectSize(size.id)}
              title={size.name}
            >
              {size.quantity > 0 && size.quantity <= 5 && (
                <div className='absolute right-1 top-1 size-1.5 bg-red-600' />
              )}
              <span
                className={clsx(
                  'flex items-center justify-center text-sm uppercase',
                  {
                    'text-default-500 line-through': size.quantity === 0,
                  }
                )}
              >
                {size.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export type { ProductGridSizesProps };
export { ProductGridSizes };
