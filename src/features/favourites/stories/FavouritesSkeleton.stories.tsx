import type { Meta, StoryObj } from '@storybook/react';

import { FavouritesSkeleton } from '../components/FavouritesSkeleton';

const meta: Meta<typeof FavouritesSkeleton> = {
  component: FavouritesSkeleton,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
