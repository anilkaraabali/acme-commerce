import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { ReviewsCard } from '../ReviewsCard';

const mockReview = {
  author: 'John Doe',
  content:
    'This is a long review content that exceeds 128 characters. This content will be cropped when displayed in the ReviewsCard component, and can be expanded when the user clicks "Show more". It provides more details about the product and user experience.',
  createdAt: '2025-03-06T12:30:00Z',
  id: '1',
  rating: 4,
};

describe('ReviewsCard', () => {
  it('should render truncated content when disableToggle is false and content exceeds maxLength', () => {
    render(
      <ReviewsCard disableToggle={false} maxLength={128} review={mockReview} />
    );

    expect(
      screen.getByText(
        /This is a long review content that exceeds 128 characters. This content will be cropped when displayed in the ReviewsCard compon.../
      )
    ).toBeInTheDocument();
    expect(screen.getByText('cta.showMore')).toBeInTheDocument();
  });

  it('should render full content when disableToggle is true', () => {
    render(
      <ReviewsCard disableToggle={true} maxLength={128} review={mockReview} />
    );

    expect(screen.getByText(mockReview.content)).toBeInTheDocument();
    expect(screen.queryByText('cta.showMore')).not.toBeInTheDocument();
  });

  it('should toggle content when clicking "Show more" button', () => {
    render(
      <ReviewsCard disableToggle={false} maxLength={128} review={mockReview} />
    );

    expect(
      screen.getByText(
        /This is a long review content that exceeds 128 characters. This content will be cropped when displayed in the ReviewsCard compon.../
      )
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('cta.showMore'));

    expect(screen.getByText(mockReview.content)).toBeInTheDocument();
    expect(screen.getByText('cta.showLess')).toBeInTheDocument();
  });

  it('should hide toggle button when content is within maxLength', () => {
    const shortReview = {
      ...mockReview,
      content: 'Short review content',
    };

    render(
      <ReviewsCard disableToggle={false} maxLength={128} review={shortReview} />
    );

    expect(screen.queryByText('cta.showMore')).not.toBeInTheDocument();
    expect(screen.getByText(shortReview.content)).toBeInTheDocument();
  });

  it('should not render "Show more" button when disableToggle is true', () => {
    render(
      <ReviewsCard disableToggle={true} maxLength={128} review={mockReview} />
    );

    expect(screen.queryByText('cta.showMore')).not.toBeInTheDocument();
  });
});
