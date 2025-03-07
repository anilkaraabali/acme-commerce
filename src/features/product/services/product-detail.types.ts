import { ProductResponse } from './product.types';

interface ProductDetailResponse {
  data: {
    product: ProductResponse;
  };
}
export type { ProductDetailResponse };
