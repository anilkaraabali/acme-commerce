import type { Meta, StoryObj } from '@storybook/react';

import { SanitizeHtml } from './SanitizeHtml';

const meta: Meta<typeof SanitizeHtml> = {
  component: SanitizeHtml,
  title: 'Components/SanitizeHtml',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    text: '<p>Acme Limited Edition • New Arrival</p><br/><p>A serving bowl crafted from mango wood and mounted on three small feet. Every piece is uniquely made and adds a natural charm to your table setting. Height approx. 11 cm. Diameter 17.5 cm.</p>',
  },
};
