import type { Meta, StoryObj } from '@storybook/react';

import { ErrorLayout } from './layout';

const meta: Meta<typeof ErrorLayout> = {
  component: ErrorLayout,
  title: 'Components/ErrorLayout',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    statusCode: 404,
  },
};
