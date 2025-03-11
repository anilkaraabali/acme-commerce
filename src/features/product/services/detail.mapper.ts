import { ProductDetailData } from '../types';
import { ProductDetailResponse } from './types';

const productDetailMapper = (
  rawData: ProductDetailResponse
): ProductDetailData => {
  const { data } = rawData;

  return {
    product: {
      careInstructions: data.product.care_instructions,
      colorId: data.product.color_id,
      description: data.product.description,
      estimatedDeliveryDate: data.product.estimated_delivery_date,
      id: data.product.id,
      images: data.product.images,
      limitedEdition: data.product.limited_edition,
      materials: data.product.materials,
      newArrival: data.product.new_arrival,
      price: data.product.price,
      salePrice: data.product.sale_price,
      title: data.product.title,
      url: data.product.url,
      variants: {
        colors: data.product.variants.colors,
      },
    },
  };
};

export { productDetailMapper };
