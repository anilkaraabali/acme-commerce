import type { Meta, StoryObj } from '@storybook/react';

import { SignUpForm } from '../components/SignUpForm';

const meta: Meta<typeof SignUpForm> = {
  component: SignUpForm,
  title: 'features/auth/SignUpForm',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    referer: 'https://example.com',
  },
};
