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

type Gender = 'kids' | 'ladies' | 'men';

interface ProductResponse {
  care_instructions: string;
  category: string;
  color_id: string;
  description: string;
  estimated_delivery_date: string;
  gender: Gender;
  id: string;
  images: Image[];
  limited_edition: boolean;
  materials: string;
  new_arrival: boolean;
  price: Price;
  sale_price: Price | null;
  title: string;
  url: string;
  variants: {
    colors: ColorVariant[];
  };
}

export type { ProductResponse };
