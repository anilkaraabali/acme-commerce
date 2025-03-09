import type { Meta, StoryObj } from '@storybook/react';

import { ProductFavouritesSkeleton } from '../components';

const meta: Meta<typeof ProductFavouritesSkeleton> = {
  component: ProductFavouritesSkeleton,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
