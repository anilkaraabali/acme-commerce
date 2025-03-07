import type { Meta, StoryObj } from '@storybook/react';

import { ProductPrice } from './ProductPrice';

const meta: Meta<typeof ProductPrice> = {
  component: ProductPrice,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    price: {
      currency: '£',
      value: 100,
    },
    salePrice: {
      currency: '£',
      value: 80,
    },
  },
};
