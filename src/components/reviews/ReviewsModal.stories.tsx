import type { Args, Meta, StoryObj } from '@storybook/react';

import { Button } from '@heroui/react';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import { ReviewsModal } from './ReviewsModal';
import { Review } from './types';

const mockReviews: Review[] = Array.from({ length: 5 }).map((_, index) => ({
  content:
    "This product is absolutely amazing! I wasn't sure what to expect, but it exceeded all my expectations in terms of quality, usability, and design. I've been using it for a few weeks now, and it has made a noticeable difference in my daily routine. The customer support team was also incredibly helpful when I had questions about some features. It's a bit pricey, but I believe it's worth every penny considering the value it offers. Highly recommend this to anyone looking for a reliable and well-designed solution for their needs!",
  createdAt: '2021-09-01T00:00:00.000Z',
  id: index.toString(),
  rating: (index % 5) + 1,
  userId: 'user-123',
}));

const meta: Meta<typeof ReviewsModal> = {
  args: {
    onAddClick: action('onAddClick'),
    onOpenChange: action('onOpenChange'),
  },
  component: ReviewsModal,
};

export default meta;

type Story = StoryObj<typeof meta>;

const ReviewsModalWithAction = (args: Args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button color='primary' onPress={() => setIsOpen(true)}>
        Open modal
      </Button>
      {isOpen && (
        <ReviewsModal
          isOpen={isOpen}
          onAddClick={args.onAddClick}
          onOpenChange={() => setIsOpen(false)}
          reviews={args.reviews}
        />
      )}
    </>
  );
};

export const Base: Story = {
  args: {
    reviews: mockReviews,
  },
  render: ReviewsModalWithAction,
};
