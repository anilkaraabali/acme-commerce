import type { Meta, StoryObj } from '@storybook/react';

import { ProductDiscountBadge } from './ProductDiscountBadge';

const meta: Meta<typeof ProductDiscountBadge> = {
  component: ProductDiscountBadge,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    discountRate: '-20%',
  },
};
