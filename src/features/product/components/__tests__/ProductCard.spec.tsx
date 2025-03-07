import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProductListingData } from '../../model';
import { ProductCard } from '../ProductCard';

const mockProduct: ProductListingData['data']['products'][0] = {
  id: '123',
  image: {
    alt: 'Sample Product Image',
    height: 300,
    url: '/images/sample.jpg',
    width: 300,
  },
  limitedEdition: true,
  newArrival: false,
  outOfStock: false,
  price: {
    currency: '$',
    value: 100,
  },
  salePrice: {
    currency: '$',
    value: 80,
  },
  title: 'Sample Product',
  url: '/product/sample',
  variants: {
    colors: [
      { name: 'Red', url: '/product/sample/red', value: '#FF0000' },
      { name: 'Blue', url: '/product/sample/blue', value: '#0000FF' },
    ],
  },
};

describe('ProductCard', () => {
  it('renders the product card correctly', () => {
    render(<ProductCard index={0} product={mockProduct} />);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /sample product/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('product-price')).toHaveTextContent('$100');
    expect(screen.getByTestId('product-sale-price')).toHaveTextContent('$80');
    expect(screen.getByTestId('product-discount')).toBeInTheDocument();
  });

  it('renders the limited edition label', () => {
    render(<ProductCard index={0} product={mockProduct} />);

    expect(screen.getByText('limitedEdition')).toBeInTheDocument();
  });

  it('renders the out of stock label when applicable', () => {
    render(
      <ProductCard index={0} product={{ ...mockProduct, outOfStock: true }} />
    );

    expect(screen.getByText('outOfStock')).toBeInTheDocument();
  });

  it('renders color variants when available', () => {
    render(<ProductCard index={0} product={mockProduct} />);

    expect(screen.getAllByRole('link', { name: /red|blue/i })).toHaveLength(2);
  });

  it('renders wishlist button and allows interaction', async () => {
    render(<ProductCard index={0} product={mockProduct} />);

    const wishlistButton = screen.getByRole('button');

    expect(wishlistButton).toBeInTheDocument();

    await userEvent.click(wishlistButton);
    // Add expectations if clicking should trigger an effect
  });
});
