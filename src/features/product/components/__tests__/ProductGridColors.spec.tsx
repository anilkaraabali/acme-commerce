import { fireEvent, render, screen } from '@testing-library/react';

import { Product } from '../../model';
import { ProductGridColors } from '../ProductGridColors';

const mockColors: Product['variants']['colors'] = [
  {
    id: '1',
    image: {
      alt: 'Red Color',
      height: 100,
      url: '/images/red.jpg',
      width: 100,
    },
    name: 'Red',
    sizes: [],
    url: '/product/red',
    value: 'red',
  },
  {
    id: '2',
    image: {
      alt: 'Blue Color',
      height: 100,
      url: '/images/blue.jpg',
      width: 100,
    },
    name: 'Blue',
    sizes: [],
    url: '/product/blue',
    value: 'blue',
  },
];

describe('ProductGridColors', () => {
  const onSelectColorMock = jest.fn();

  it('renders color selector and selected color', () => {
    render(
      <ProductGridColors
        colors={mockColors}
        onSelectColor={onSelectColorMock}
        selectedColorId='1'
      />
    );

    expect(screen.getByText('variants.color')).toBeInTheDocument();
    expect(screen.getByText('Red')).toBeInTheDocument();
  });

  it('calls onSelectColor with the correct id when a color is clicked', () => {
    render(
      <ProductGridColors
        colors={mockColors}
        onSelectColor={onSelectColorMock}
        selectedColorId='1'
      />
    );

    const blueColor = screen.getByTitle('Blue');

    fireEvent.click(blueColor);

    expect(onSelectColorMock).toHaveBeenCalledWith('2');
  });

  it('applies correct styles for selected color', () => {
    render(
      <ProductGridColors
        colors={mockColors}
        onSelectColor={onSelectColorMock}
        selectedColorId='1'
      />
    );

    const redColor = screen.getByTitle('Red');

    expect(redColor).toHaveClass('z-10 outline-foreground');
  });

  it('renders color images correctly', () => {
    render(
      <ProductGridColors
        colors={mockColors}
        onSelectColor={onSelectColorMock}
        selectedColorId='1'
      />
    );

    const redImage = screen.getByAltText('Red Color');
    const blueImage = screen.getByAltText('Blue Color');

    expect(redImage).toBeInTheDocument();
    expect(blueImage).toBeInTheDocument();
  });
});
