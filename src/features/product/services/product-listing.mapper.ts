import { ProductListingData } from '../model';
import { ProductListingResponse } from './product-listing.types';

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
        const outOfStock = product.variants.colors.every((color) =>
          color.sizes.every((size) => size.quantity === 0)
        );

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
