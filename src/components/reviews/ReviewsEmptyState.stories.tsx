import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { ReviewsEmptyState } from './ReviewsEmptyState';

const meta: Meta<typeof ReviewsEmptyState> = {
  args: {
    onCtaClick: action('onCtaClick'),
  },
  component: ReviewsEmptyState,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => (
    <div className='max-w-[458px]'>
      <ReviewsEmptyState {...args} />
    </div>
  ),
};
