import { render, screen } from '@testing-library/react';

import { Product } from '../../model';
import { ProductPrice } from '../ProductPrice';

describe('ProductPrice', () => {
  const price: Product['price'] = {
    currency: '$',
    value: 100.0,
  };

  const salePrice: Product['salePrice'] = {
    currency: '$',
    value: 80.0,
  };

  it('renders regular price when no sale price is provided', () => {
    render(<ProductPrice price={price} salePrice={null} />);

    const priceElement = screen.getByTestId('product-price');

    expect(priceElement).not.toHaveClass('line-through');

    const salePriceElement = screen.queryByTestId('product-sale-price');

    expect(salePriceElement).not.toBeInTheDocument();
  });

  it('renders sale price and regular price when sale price is provided', () => {
    render(<ProductPrice price={price} salePrice={salePrice} />);

    const salePriceElement = screen.getByTestId('product-sale-price');

    expect(salePriceElement).toHaveClass('font-bold');

    const priceElement = screen.getByTestId('product-price');

    expect(priceElement).toHaveClass('line-through');
  });
});
