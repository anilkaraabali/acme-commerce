import { ProductCard, ProductListingData } from '@/features/product';
import { LayoutProps } from '@/types';
import { NextPage } from 'next';

interface SearchPageProps extends LayoutProps {
  searchResult: ProductListingData;
}

const SearchPage: NextPage<SearchPageProps> = (props) => (
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

export type { SearchPageProps };
export default SearchPage;
