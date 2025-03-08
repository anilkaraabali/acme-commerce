import { ProductResponse } from './product.types';

const productResponseStub = (
  data: Partial<ProductResponse> = {}
): ProductResponse => ({
  care_instructions:
    '<p>Machine wash at 30°. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.</p>',
  category: 'dresses',
  color_id: '1002',
  description:
    '<p>Acme Limited Edition • New Arrival</p><br/><p>Long dress in crêpe chiffon with a deep V-neckline and an unlined yoke and batwing sleeves detailed with covered elastication for a ruched effect. Loose fit with a narrow drawstring at the waist with dice-shaped metal beads. Viscose lining.</p>',
  estimated_delivery_date: '2025-03-24T14:30:45.123Z',
  gender: 'ladies',
  id: '1263361002',
  images: [
    {
      alt: 'Satin kaftan dress - Cream/Flowers - Ladies | 1',
      height: 3240,
      url: 'https://image.hm.com/assets/hm/6e/55/6e55414d5b24b5fec225db577eec54a4082a5ac0.jpg?imwidth=2160',
      width: 2160,
    },
    {
      alt: 'Satin kaftan dress - Cream/Flowers - Ladies | 2',
      height: 3240,
      url: 'https://image.hm.com/assets/hm/e1/42/e14280bd33ec2890ba6f4ed660bfa01d24f2aa2b.jpg?imwidth=2160',
      width: 2160,
    },
  ],
  limited_edition: true,
  materials:
    '<p>Shell: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><br/><p>Lining: Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;.</p>',
  new_arrival: true,
  price: {
    currency: '£',
    value: 44.99,
  },
  sale_price: null,
  title: 'Satin kaftan dress',
  url: '/pdp/satin-kaftan-dress?ct=true&colorId=1002&pid=1263361002',
  variants: {
    colors: [
      {
        id: '1002',
        image: {
          alt: 'Cream/Flowers',
          height: 174,
          url: 'https://image.hm.com/assets/hm/6e/55/6e55414d5b24b5fec225db577eec54a4082a5ac0.jpg?imwidth=116',
          width: 116,
        },
        name: 'Cream/Flowers',
        sizes: [
          { id: '001', name: 'XS-S', quantity: 0 },
          { id: '002', name: 'M-L', quantity: 0 },
          { id: '003', name: 'XL-XXL', quantity: 0 },
        ],
        url: '',
        value: '#f0eeed',
      },
      {
        id: '1003',
        image: {
          alt: 'Bright red/Patterned',
          height: 174,
          url: 'https://image.hm.com/assets/hm/84/69/84690187ac7b8cf71672fb1711693377892cdeb3.jpg?imwidth=116',
          width: 116,
        },
        name: 'Bright red/Patterned',
        sizes: [
          { id: '001', name: 'XS-S', quantity: 10 },
          { id: '002', name: 'M-L', quantity: 0 },
          { id: '003', name: 'XL-XXL', quantity: 0 },
        ],
        url: '/pdp/satin-kaftan-dress?ct=true&colorId=1003&pid=1263361003',
        value: '#b91624',
      },
    ],
  },
  ...data,
});

export { productResponseStub };
