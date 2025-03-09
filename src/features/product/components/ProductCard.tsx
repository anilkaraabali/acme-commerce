import { IconHeart } from '@/components/icons';
import { USER_FAVORITES_STORAGE_KEY } from '@/features/auth';
import clsx from 'clsx';
import Image from 'next/image';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { ProductListingData } from '../types';
import { productGetDiscountRate } from '../utils';
import { ProductDiscountBadge } from './ProductDiscountBadge';
import { ProductPrice } from './ProductPrice';

interface ProductCardProps {
  classNames?: {
    image?: string;
  };
  index: number;
  product: ProductListingData['data']['products'][0];
}

const ProductCard: FC<ProductCardProps> = ({ classNames, product }) => {
  const t = useTranslations('Product');
  const [userFavorites, setUserFavorites] = useLocalStorage<string[]>(
    USER_FAVORITES_STORAGE_KEY,
    []
  );

  const [isFavorite, setIsFavorite] = useState(false);

  const discountRate = useMemo(
    () => productGetDiscountRate(product.price, product.salePrice),
    [product.price, product.salePrice]
  );

  const toggleFavorite = useCallback(() => {
    setUserFavorites((prevFavorites) => {
      if (prevFavorites.includes(product.id)) {
        return prevFavorites.filter((id) => id !== product.id);
      }

      return [...prevFavorites, product.id];
    });
  }, [setUserFavorites, product.id]);

  useEffect(() => {
    if (userFavorites.includes(product.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [userFavorites, product.id]);

  return (
    <article
      className='relative flex flex-col'
      data-id={product.id}
      data-testid='product-card'
    >
      <div className='relative'>
        {discountRate && (
          <ProductDiscountBadge
            classNames={{
              base: 'absolute bottom-0 left-0',
            }}
            discountRate={discountRate}
          />
        )}
        <button
          className='absolute right-0 top-0 z-[1] flex size-12 items-center justify-center'
          data-testid='product-card-favorite'
          onClick={toggleFavorite}
        >
          <IconHeart
            className={clsx('fill-black text-white', {
              '!fill-red-500 !text-red-500': isFavorite,
            })}
          />
        </button>
        <picture>
          <Image
            alt={product.image.alt}
            className={classNames?.image}
            data-testid='product-card-image'
            height={product.image.height}
            loading='eager'
            priority
            src={product.image.url}
            width={product.image.width}
          />
        </picture>
        <NextLink
          className='absolute inset-0'
          data-testid='product-card-image-link'
          href={product.url}
          title={product.title}
        />
      </div>
      <div className='flex flex-col gap-1 px-6 pt-2'>
        {product.limitedEdition && (
          <span className='text-xs'>{t('limitedEdition')}</span>
        )}
        <div>
          <h3 className='text-sm uppercase'>
            <NextLink
              className='relative z-[1]'
              data-testid='product-card-link'
              href={product.url}
              title={product.title}
            >
              {product.title}
            </NextLink>
          </h3>
          <ProductPrice price={product.price} salePrice={product.salePrice} />
        </div>
        {product.outOfStock ? (
          <p className='text-xs'>{t('outOfStock')}</p>
        ) : (
          product.variants.colors.length > 1 && (
            <ul className='flex gap-1 py-1' data-testid='product-card-colors'>
              {product.variants.colors.map((color) => (
                <li className='flex' key={color.value}>
                  <NextLink
                    className='inline-block size-2 border-1 border-foreground'
                    href={color.url || product.url}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </article>
  );
};

export type { ProductCardProps };
export { ProductCard };
