import type { Meta, StoryObj } from '@storybook/react';

import { SignUpHeader } from '../components/SignUpHeader';

const meta: Meta<typeof SignUpHeader> = {
  component: SignUpHeader,
  title: 'features/auth/SignUpHeader',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
