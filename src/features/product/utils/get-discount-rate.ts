import { Product } from '../types';

const productGetDiscountRate = (
  price: Product['price'],
  salePrice: Product['salePrice']
): null | string => {
  if (!salePrice) {
    return null;
  }

  if (salePrice.value >= price.value) {
    return null;
  }

  const discountAmount = price.value - salePrice.value;
  const discountPercentage = (discountAmount / price.value) * 100;

  return discountPercentage === 0
    ? null
    : `-${Math.round(discountPercentage)}%`;
};

export { productGetDiscountRate };
