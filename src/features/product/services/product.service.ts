import { apiFetcher } from '@/services/api-fetcher';

import { ProductDetailData, ProductListingData } from '../model';
import { productDetailMapper } from './product-detail.mapper';
import { ProductDetailResponse } from './product-detail.types';
import { productListingMapper } from './product-listing.mapper';
import { ProductListingResponse } from './product-listing.types';

type FetcherArgs = {
  query?: Record<string, boolean | number | string>;
  requestInit?: RequestInit;
};

class ProductService {
  private static instance: ProductService;

  private constructor() {}

  static getInstance() {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }

    return ProductService.instance;
  }

  async fetchProductById(id: string, args?: FetcherArgs) {
    return await apiFetcher<ProductDetailResponse, ProductDetailData>({
      mapper: productDetailMapper,
      url: `/${id}`,
      ...args,
    });
  }

  async fetchProducts(args: FetcherArgs = {}) {
    return await apiFetcher<ProductListingResponse, ProductListingData>({
      mapper: productListingMapper,
      url: '/index',
      ...args,
    });
  }
}

export const productService = ProductService.getInstance();
