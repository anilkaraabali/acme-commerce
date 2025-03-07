import clsx from 'clsx';
import Image from 'next/image';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Product } from '../model';

interface ProductGridColorsProps {
  colors: Product['variants']['colors'];
  selectedColorId: string;
}

const ProductGridColors: FC<ProductGridColorsProps> = ({
  colors,
  selectedColorId,
}) => {
  const t = useTranslations('Product');

  const selectedColor = colors.find((color) => color.id === selectedColorId)!;
  const isOutOfStock = selectedColor.sizes.every((size) => size.quantity === 0);

  return (
    <div
      className='my-12 flex flex-col gap-4'
      data-testid='product-color-selector'
    >
      <div className='flex gap-1'>
        <h2 className='text-sm uppercase'>{t('variants.color')}</h2>
        <p className='text-sm'>{selectedColor.name}</p>
      </div>
      <ul className='grid grid-cols-7 gap-px xl:grid-cols-5'>
        {colors.map((color) => (
          <li key={color.id}>
            <NextLink
              className={clsx(
                'relative block w-full overflow-hidden outline outline-1 outline-default-300 transition-all duration-200 hover:z-10 hover:outline-foreground',
                {
                  'z-10 outline-foreground': color.id === selectedColorId,
                }
              )}
              data-testid='product-color'
              href={color.url}
              title={color.name}
            >
              {selectedColor.id === color.id && isOutOfStock && (
                <div className='product-color-cross' />
              )}
              <picture>
                <Image
                  alt={color.image.alt}
                  data-testid='product-variant-image'
                  height={color.image.height}
                  loading='eager'
                  priority
                  src={color.image.url}
                  width={color.image.width}
                />
              </picture>
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export type { ProductGridColorsProps };
export { ProductGridColors };
