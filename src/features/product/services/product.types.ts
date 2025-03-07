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
  description: string;
  estimated_delivery_date: string;
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
