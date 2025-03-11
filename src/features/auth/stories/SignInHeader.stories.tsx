import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { SignInHeader } from '../components/SignInHeader';

const meta: Meta<typeof SignInHeader> = {
  args: {
    onVerify: action('onVerify'),
  },
  component: SignInHeader,
  title: 'features/auth/SignInHeader',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
