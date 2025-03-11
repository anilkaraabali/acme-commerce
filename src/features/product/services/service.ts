import { apiFetcher } from '@/services/api-fetcher';

import { ProductDetailData, ProductListingData } from '../types';
import { productDetailMapper } from './detail.mapper';
import { productListingMapper } from './listing.mapper';
import { ProductDetailResponse, ProductListingResponse } from './types';

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

  async fetchProducts(url: string, args?: FetcherArgs) {
    return await apiFetcher<ProductListingResponse, ProductListingData>({
      mapper: productListingMapper,
      url,
      ...args,
    });
  }
}

export const productService = ProductService.getInstance();
