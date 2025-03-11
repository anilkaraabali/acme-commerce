import type { Meta, StoryObj } from '@storybook/react';

import { LanguageSwitch } from './LanguageSwitch';

const meta: Meta<typeof LanguageSwitch> = {
  component: LanguageSwitch,
  title: 'Components/LanguageSwitch',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
