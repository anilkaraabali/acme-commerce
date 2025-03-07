import { LayoutProps } from '@/types';

import { ProductCard } from '../components';
import { ProductListingData } from '../model';

interface ProductListProps extends LayoutProps {
  searchResult: ProductListingData;
}

function ProductList(props: ProductListProps) {
  return (
    <main>
      <h1 className='mx-4 mb-12 mt-6 text-3xl font-bold uppercase lg:mx-6 lg:mb-16 lg:mt-12 lg:text-5xl'>
        Limited Edition 2025
      </h1>
      <section id='product-listing-section'>
        <ul className='grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-y-14'>
          {props.searchResult.data.products.map((product, index) => (
            <li key={product.id}>
              <ProductCard index={index} product={product} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export type { ProductListProps };
export default ProductList;
