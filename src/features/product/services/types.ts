import { ProductTarget } from '../constants/target.constant';

type Image = {
  alt: string;
  height: number;
  url: string;
  width: number;
};

type Price = {
  currency: string;
  value: number;
};

type SizeVariant = {
  id: string;
  name: string;
  quantity: number;
};

type ColorVariant = {
  id: string;
  image: Image;
  name: string;
  sizes: SizeVariant[];
  url: string;
  value: string;
};

interface ProductResponse {
  care_instructions: string;
  category: string;
  color_id: string;
  description: string;
  estimated_delivery_date: string;
  id: string;
  images: Image[];
  limited_edition: boolean;
  materials: string;
  new_arrival: boolean;
  price: Price;
  sale_price: Price | null;
  target: ProductTarget;
  title: string;
  url: string;
  variants: {
    colors: ColorVariant[];
  };
}

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

interface ProductDetailResponse {
  data: {
    product: ProductResponse;
  };
}

export type { ProductDetailResponse, ProductListingResponse, ProductResponse };
