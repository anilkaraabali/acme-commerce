import type { Meta, StoryObj } from '@storybook/react';

import { UserAvatar } from '../components/UserAvatar';

const meta: Meta<typeof UserAvatar> = {
  args: {
    name: 'John Doe',
  },
  component: UserAvatar,
  title: 'features/auth/UserAvatar',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
