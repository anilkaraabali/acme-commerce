import { useAuth } from '@/features/auth';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

import { PRODUCT_REVIEWS_STORAGE_KEY } from '../../constants';
import { ProductReview, ProductReviewsMap } from '../../types';

interface ProductReviewsContextType {
  hasUserReviewed: boolean;
  ratingAverage: number;
  reviews: ProductReview[];
}

const ProductReviewsContext = createContext<
  ProductReviewsContextType | undefined
>(undefined);

const ProductReviewsProvider: FC<PropsWithChildren<{ productId: string }>> = ({
  children,
  productId,
}) => {
  const { user } = useAuth();
  const productReviews = useReadLocalStorage<ProductReviewsMap>(
    PRODUCT_REVIEWS_STORAGE_KEY ?? {}
  );

  const filteredReviews = useMemo(
    () => productReviews?.[productId] || [],
    [productReviews, productId]
  );

  const ratingAverage = useMemo(
    () =>
      filteredReviews.reduce((acc, review) => acc + review.rating, 0) /
      filteredReviews.length,
    [filteredReviews]
  );

  const hasUserReviewed = useMemo(
    () => !!user && filteredReviews.some((review) => review.userId === user.id),
    [filteredReviews, user]
  );

  return (
    <ProductReviewsContext.Provider
      value={{
        hasUserReviewed,
        ratingAverage,
        reviews: filteredReviews,
      }}
    >
      {children}
    </ProductReviewsContext.Provider>
  );
};

const useProductReviews = () => {
  const context = useContext(ProductReviewsContext);

  if (!context) {
    throw new Error(
      'useProductReviews must be used within a ProductReviewsProvider'
    );
  }

  return context;
};

export { ProductReviewsContext, ProductReviewsProvider, useProductReviews };
