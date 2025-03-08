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

interface Product {
  careInstructions: string;
  colorId: string;
  description: string;
  estimatedDeliveryDate: string;
  id: string;
  images: Image[];
  limitedEdition: boolean;
  materials: string;
  newArrival: boolean;
  price: Price;
  salePrice: Price | null;
  title: string;
  url: string;
  variants: {
    colors: ColorVariant[];
  };
}

export type { Product };
