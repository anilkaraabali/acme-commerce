import { useAuth } from '@/features/auth';
import { fireEvent, render, screen } from '@testing-library/react';
import { useLocalStorage } from 'usehooks-ts';

import { ProductListingData } from '../../model';
import { ProductCard } from '../ProductCard';

jest.mock('@/features/auth', () => ({
  useAuth: jest.fn(() => ({
    openAuthModal: jest.fn(),
    user: null,
  })),
}));

jest.mock('usehooks-ts', () => ({
  useLocalStorage: jest.fn(() => [[], jest.fn()]),
}));

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

  it('opens auth modal when user clicks favorite button and is not logged in', () => {
    const openAuthModalMock = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      openAuthModal: openAuthModalMock,
      user: null,
    });

    render(<ProductCard index={0} product={mockProduct} />);

    const favoriteButton = screen.getByTestId('product-card-favorite');

    fireEvent.click(favoriteButton);

    expect(openAuthModalMock).toHaveBeenCalledTimes(1);
  });

  test('toggles favorite button when user is logged in', () => {
    const setUserFavoritesMock = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      openAuthModal: jest.fn(),
      user: { id: 'user123' },
    });
    (useLocalStorage as jest.Mock).mockReturnValue([[], setUserFavoritesMock]);

    render(<ProductCard index={0} product={mockProduct} />);

    const favoriteButton = screen.getByTestId('product-card-favorite');

    fireEvent.click(favoriteButton);

    expect(setUserFavoritesMock).toHaveBeenCalled();

    fireEvent.click(favoriteButton);

    expect(setUserFavoritesMock).toHaveBeenCalledWith(
      expect.not.arrayContaining([mockProduct.id])
    );
  });
});
