import { USER_FAVORITES_STORAGE_KEY } from '@/features/auth';
import {
  ProductCard,
  ProductListingData,
  productListingMapper,
} from '@/features/product';
import { ProductListingResponse } from '@/features/product/services/types';
import { LayoutProps } from '@/types';
import { Alert, Skeleton } from '@heroui/react';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { list } from 'radash';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { FavouritesEmptyState } from '../components/FavouritesEmptyState';
import { FavouritesSkeleton } from '../components/FavouritesSkeleton';

const fetcher = async (url: string): Promise<ProductListingResponse> => {
  const response = await fetch(url);

  return response.json();
};

interface FavouritesPageProps extends LayoutProps {}

const FavouritesPage: NextPage<FavouritesPageProps> = () => {
  const t = useTranslations('Favourites');
  const userFavs = useReadLocalStorage<string[]>(USER_FAVORITES_STORAGE_KEY);

  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState<
    ProductListingData['data']['products']
  >([]);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, error, isLoading } = useSWR<ProductListingResponse>(
    shouldFetch ? '/api/v1/products/all/index.json' : null,
    fetcher
  );

  useEffect(() => {
    if (userFavs?.length) {
      setShouldFetch(true);
    }
  }, [userFavs]);

  useEffect(() => {
    if (data && userFavs?.length) {
      const filteredProducts = data.data.products.filter((product) =>
        userFavs.some((fav) => fav === product.id)
      );

      const filteredData: ProductListingResponse = {
        ...data,
        data: {
          ...data.data,
          products: filteredProducts,
        },
      };

      const mappedData = productListingMapper(filteredData);

      setProducts(mappedData.data.products);
    }
  }, [data, userFavs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hasOutOfStockProducts = useMemo(
    () => products.some((product) => product.outOfStock),
    [products]
  );

  return (
    <main>
      <h1 className='page-title'>{t('title')}</h1>
      {!isMounted ? (
        <FavouritesSkeleton />
      ) : userFavs?.length ? (
        isLoading || error || !data ? (
          <ul className='product-list-grid'>
            {list(3).map((_, index) => (
              <li key={index}>
                <Skeleton className='aspect-h-3 aspect-w-2 w-full' />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className='mb-4 px-4'>
              {hasOutOfStockProducts && (
                <Alert
                  className='mb-4'
                  color='warning'
                  title={t('notificationText')}
                />
              )}
              <h2 className='uppercase'>
                {t('total', { count: products.length })}
              </h2>
            </div>
            <ul className='product-list-grid'>
              {products.map((product, index) => (
                <li key={product.id}>
                  <ProductCard
                    classNames={{
                      image: product.outOfStock ? 'opacity-50' : '',
                    }}
                    index={index}
                    product={product}
                  />
                </li>
              ))}
            </ul>
          </>
        )
      ) : (
        <FavouritesEmptyState />
      )}
    </main>
  );
};

export type { FavouritesPageProps };
export default FavouritesPage;
