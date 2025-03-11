import { ProductListingData } from '../types';
import { ProductListingResponse } from './types';

const productListingMapper = (
  rawData: ProductListingResponse
): ProductListingData => {
  const { data, meta } = rawData;

  return {
    data: {
      products: data.products.map((product) => {
        const colors = product.variants.colors.map((color) => ({
          name: color.name,
          url: color.url,
          value: color.value,
        }));

        const outOfStock =
          product.variants.colors
            .find((color) => color.id === product.color_id)
            ?.sizes.every((size) => size.quantity === 0) ?? false;

        return {
          colors,
          id: product.id,
          image: product.images[0],
          limitedEdition: product.limited_edition,
          newArrival: product.new_arrival,
          outOfStock,
          price: product.price,
          salePrice: product.sale_price,
          title: product.title,
          url: product.url,
          variants: {
            colors,
          },
        };
      }),
    },
    meta,
  };
};

export { productListingMapper };
