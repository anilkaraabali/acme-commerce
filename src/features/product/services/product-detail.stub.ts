import { productResponseStub } from './product.stub';
import { ProductDetailResponse } from './product-detail.types';

const productDetailStub = (
  data: Partial<ProductDetailResponse> = {}
): ProductDetailResponse => ({
  data: {
    product: productResponseStub(),
  },
  ...data,
});

export { productDetailStub };
