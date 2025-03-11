import type { Meta, StoryObj } from '@storybook/react';

import { ThemeSwitch } from './ThemeSwitch';

const meta: Meta<typeof ThemeSwitch> = {
  component: ThemeSwitch,
  title: 'Components/ThemeSwitch',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
