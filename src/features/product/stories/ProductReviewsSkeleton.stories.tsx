import type { Meta, StoryObj } from '@storybook/react';

import { ProductReviewsSkeleton } from '../components/ProductReviewsSkeleton';

const meta: Meta<typeof ProductReviewsSkeleton> = {
  component: ProductReviewsSkeleton,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => (
    <div className='max-w-[458px]'>
      <ProductReviewsSkeleton {...args} />
    </div>
  ),
};
