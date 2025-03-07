import { ProductResponse } from './product.types';

interface ProductListingResponse {
  data: {
    products: ProductResponse[];
  };
  meta: {
    count: number;
    left: number;
    pagination: {
      page: number;
      total: number;
    };
  };
}
export type { ProductListingResponse };
