import { productResponseStub } from './product.stub';
import { ProductListingResponse } from './product-listing.types';

const productListingStub = (
  rawData: Partial<ProductListingResponse> = {}
): ProductListingResponse => ({
  data: {
    products: [productResponseStub()],
  },
  meta: {
    count: 1,
    left: 1,
    pagination: {
      page: 1,
      total: 1,
    },
  },
  ...rawData,
});

export { productListingStub };
