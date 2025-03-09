import type { Meta, StoryObj } from '@storybook/react';

import { ProductFavouritesEmptyState } from '../components';

const meta: Meta<typeof ProductFavouritesEmptyState> = {
  component: ProductFavouritesEmptyState,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
