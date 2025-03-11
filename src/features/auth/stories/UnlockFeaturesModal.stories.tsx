import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@heroui/react';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import { UnlockFeaturesModal } from '../components/UnlockFeaturesModal';

const meta: Meta<typeof UnlockFeaturesModal> = {
  args: {
    onOpenChange: action('onOpenChange'),
  },
  component: UnlockFeaturesModal,
  title: 'features/auth/UnlockFeaturesModal',
};

export default meta;

type Story = StoryObj<typeof meta>;

const UnlockFeaturesModalWithAction = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button color='primary' onPress={() => setIsOpen(true)}>
        Open modal
      </Button>
      {isOpen && (
        <UnlockFeaturesModal
          isOpen={isOpen}
          onOpenChange={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export const Base: Story = {
  render: UnlockFeaturesModalWithAction,
};
