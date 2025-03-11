import type { Meta, StoryObj } from '@storybook/react';

import { FavouritesEmptyState } from '../components/FavouritesEmptyState';

const meta: Meta<typeof FavouritesEmptyState> = {
  component: FavouritesEmptyState,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
