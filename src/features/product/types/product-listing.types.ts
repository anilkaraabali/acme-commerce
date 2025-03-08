import { Product } from './product.types';

interface ProductListingData {
  data: {
    products: ({
      image: Product['images'][0];
      outOfStock: boolean;
      variants: {
        colors: Array<{
          name: string;
          url: string;
          value: string;
        }>;
      };
    } & Pick<
      Product,
      | 'id'
      | 'limitedEdition'
      | 'newArrival'
      | 'price'
      | 'salePrice'
      | 'title'
      | 'url'
    >)[];
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
export type { ProductListingData };
