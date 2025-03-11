import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { SignInEmailForm } from '../components/SignInEmailForm';

const meta: Meta<typeof SignInEmailForm> = {
  args: {
    onVerify: action('onVerify'),
  },
  component: SignInEmailForm,
  title: 'features/auth/SignInEmailForm',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => (
    <div className='max-w-md'>
      <SignInEmailForm {...args} />
    </div>
  ),
};
