import { LayoutProps } from '@/types';
import { NextPage } from 'next';

import { ProductCard } from '../components';
import { ProductListingData } from '../types';

interface ProductListProps extends LayoutProps {
  searchResult: ProductListingData;
}

const ProductList: NextPage<ProductListProps> = (props) => (
  <main>
    <h1 className='page-title'>New In</h1>
    <section id='product-listing-section'>
      <ul className='product-list-grid'>
        {props.searchResult.data.products.map((product, index) => (
          <li key={product.id}>
            <ProductCard index={index} product={product} />
          </li>
        ))}
      </ul>
    </section>
  </main>
);

export type { ProductListProps };
export default ProductList;
