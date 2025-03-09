import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

import { Product } from '../types';

interface ProductGridGalleryProps {
  classNames?: {
    item?: string;
    list?: string;
  };
  images: Product['images'];
  onImageClick: (index: number) => void;
}

const ProductGridGallery: FC<ProductGridGalleryProps> = ({
  classNames,
  images,
  onImageClick,
}) => (
  <ul
    className={clsx(
      'hidden min-h-[150vw] grid-cols-2 gap-0 md:grid md:min-h-0',
      classNames?.list
    )}
    data-testid='product-grid-gallery'
  >
    {images.map((image, index) => {
      // Apply col-span-2 to:
      // - Every 3n+1 item (1st, 4th, 7th, ...)
      // - The 2nd item if there are only 2 images
      // - The last item if it is the only item remaining
      const totalImages = images.length;
      const isSpanTwo =
        index % 3 === 0 ||
        (totalImages === 2 && index === 1) ||
        (totalImages % 2 !== 0 && index === totalImages - 1);

      return (
        <li
          className={clsx(
            {
              'col-span-2': isSpanTwo,
            },
            classNames?.item
          )}
          data-testid='product-grid-gallery-item'
          key={index}
        >
          <button
            className='block w-full'
            data-testid='product-grid-gallery-button'
            onClick={() => onImageClick(index)}
          >
            <Image
              alt={image.alt}
              data-testid='product-grid-gallery-image'
              height={image.height}
              loading={index === 0 ? 'eager' : 'lazy'}
              priority={index === 0}
              src={image.url}
              width={image.width}
            />
          </button>
        </li>
      );
    })}
  </ul>
);

export type { ProductGridGalleryProps };
export { ProductGridGallery };
