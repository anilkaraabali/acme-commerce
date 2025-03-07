import { render, screen } from '@testing-library/react';

import { ProductDiscountBadge } from '../ProductDiscountBadge';

describe('ProductDiscountBadge', () => {
  it('renders the discount rate correctly', () => {
    render(<ProductDiscountBadge discountRate='20%' />);

    const badgeElement = screen.getByTestId('product-discount');

    expect(badgeElement).toHaveTextContent('20%');
  });

  it('applies default styles', () => {
    render(<ProductDiscountBadge discountRate='20%' />);

    const badgeElement = screen.getByTestId('product-discount');

    expect(badgeElement).toHaveClass(
      'bg-black',
      'px-2',
      'py-1',
      'text-xs',
      'text-white'
    );
  });

  it('applies custom classNames when provided', () => {
    const customClassNames = { base: 'custom-class' };

    render(
      <ProductDiscountBadge classNames={customClassNames} discountRate='20%' />
    );

    const badgeElement = screen.getByTestId('product-discount');

    expect(badgeElement).toHaveClass('custom-class');
  });
});
