import type { Args, Meta, StoryObj } from '@storybook/react';

import { Button } from '@heroui/react';
import { useState } from 'react';
import { RxShare2 } from 'react-icons/rx';

import { Share } from './Share';

const meta: Meta<typeof Share> = {
  component: Share,
  title: 'Components/Share',
};

export default meta;

type Story = StoryObj<typeof meta>;

const ShareWithAction = (args: Args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button color='primary' isIconOnly onPress={() => setIsOpen(true)}>
        <RxShare2 size={20} />
      </Button>
      {isOpen && (
        <Share
          campaign={args.campaign}
          isOpen={isOpen}
          onOpenChange={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export const Base: Story = {
  args: {
    campaign: 'productShare',
  },
  render: ShareWithAction,
};
