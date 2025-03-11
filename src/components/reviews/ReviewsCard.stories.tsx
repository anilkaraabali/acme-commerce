import type { Meta, StoryObj } from '@storybook/react';

import { ReviewCard } from './ReviewsCard';

const meta: Meta<typeof ReviewCard> = {
  component: ReviewCard,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    disableToggle: false,
    maxLength: 128,
    review: {
      content:
        "This product is absolutely amazing! I wasn't sure what to expect, but it exceeded all my expectations in terms of quality, usability, and design. I've been using it for a few weeks now, and it has made a noticeable difference in my daily routine. The customer support team was also incredibly helpful when I had questions about some features. It's a bit pricey, but I believe it's worth every penny considering the value it offers. Highly recommend this to anyone looking for a reliable and well-designed solution for their needs!",
      createdAt: '2021-09-01T00:00:00.000Z',
      id: '1',
      rating: 4,
      userId: '1',
    },
  },
  render: (args) => (
    <div className='max-w-[424px]'>
      <ReviewCard {...args} />
    </div>
  ),
};
