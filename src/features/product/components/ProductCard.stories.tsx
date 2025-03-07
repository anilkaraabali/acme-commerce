import type { Meta, StoryObj } from '@storybook/react';

import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    index: 0,
    product: {
      id: '1263361002',
      image: {
        alt: 'Satin kaftan dress - Cream/Flowers - Ladies | 1',
        height: 3240,
        url: 'https://image.hm.com/assets/hm/6e/55/6e55414d5b24b5fec225db577eec54a4082a5ac0.jpg?imwidth=2160',
        width: 2160,
      },
      limitedEdition: true,
      newArrival: false,
      outOfStock: false,
      price: {
        currency: '$',
        value: 44.99,
      },
      salePrice: null,
      title: 'Satin kaftan dress',
      url: 'https://example.com/product/satin-kaftan-dress',
      variants: {
        colors: [
          { name: 'Cream/Flowers', url: '#', value: '#f0eeed' },
          { name: 'Bright red/Patterned', url: '#', value: '#b91624' },
        ],
      },
    },
  },
  render: (args) => (
    <div className='max-w-[375px]'>
      <ProductCard {...args} />
    </div>
  ),
};
