import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { ProductReviewsEmptyState } from '../components/reviews/ProductReviewsEmptyState';

const meta: Meta<typeof ProductReviewsEmptyState> = {
  args: {
    onCtaClick: action('onCtaClick'),
  },
  component: ProductReviewsEmptyState,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => (
    <div className='max-w-[458px]'>
      <ProductReviewsEmptyState {...args} />
    </div>
  ),
};
