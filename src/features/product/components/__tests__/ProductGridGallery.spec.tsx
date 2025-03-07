import { fireEvent, render, screen } from '@testing-library/react';

import { Product } from '../../model';
import { ProductGridGallery } from '../ProductGridGallery';

const mockImages: Product['images'] = [
  { alt: 'Image 1', height: 200, url: '/image1.jpg', width: 200 },
  { alt: 'Image 2', height: 200, url: '/image2.jpg', width: 200 },
  { alt: 'Image 3', height: 200, url: '/image3.jpg', width: 200 },
  { alt: 'Image 4', height: 200, url: '/image4.jpg', width: 200 },
];

const mockOnImageClick = jest.fn();

describe('ProductGridGallery', () => {
  it('renders all images correctly', () => {
    render(
      <ProductGridGallery images={mockImages} onImageClick={mockOnImageClick} />
    );

    const images = screen.getAllByTestId('product-grid-gallery-image');

    expect(images).toHaveLength(mockImages.length);
  });

  it('calls onImageClick with the correct index when an image is clicked', () => {
    render(
      <ProductGridGallery images={mockImages} onImageClick={mockOnImageClick} />
    );

    const secondImageButton = screen.getAllByTestId(
      'product-grid-gallery-button'
    )[1];

    fireEvent.click(secondImageButton);

    expect(mockOnImageClick).toHaveBeenCalledWith(1);
  });

  it('applies col-span-2 for every 3rd image (index 0, 3, etc.)', () => {
    render(
      <ProductGridGallery images={mockImages} onImageClick={mockOnImageClick} />
    );

    const firstImage = screen.getAllByTestId('product-grid-gallery-item')[0];

    expect(firstImage).toHaveClass('col-span-2');

    const fourthImage = screen.getAllByTestId('product-grid-gallery-item')[3];

    expect(fourthImage).toHaveClass('col-span-2');
  });

  it('applies col-span-2 for the second image when there are only 2 images', () => {
    render(
      <ProductGridGallery
        images={mockImages.slice(0, 2)}
        onImageClick={mockOnImageClick}
      />
    );

    const secondImage = screen.getAllByTestId('product-grid-gallery-item')[1];

    expect(secondImage).toHaveClass('col-span-2');
  });

  it('applies custom classNames when provided', () => {
    const customClassNames = {
      item: 'custom-item-class',
      list: 'custom-list-class',
    };

    render(
      <ProductGridGallery
        classNames={customClassNames}
        images={mockImages}
        onImageClick={mockOnImageClick}
      />
    );

    const listElement = screen.getByTestId('product-grid-gallery');

    expect(listElement).toHaveClass('custom-list-class');

    const itemElements = screen.getAllByTestId('product-grid-gallery-item');

    expect(itemElements[0]).toHaveClass('custom-item-class');
  });
});
