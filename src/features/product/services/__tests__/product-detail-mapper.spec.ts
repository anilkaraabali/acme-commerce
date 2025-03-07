import { productDetailMapper } from '../product-detail.mapper';
import { productDetailStub } from '../product-detail.stub';

describe('productDetailMapper', () => {
  it('should map raw product detail response to the desired format', () => {
    const result = productDetailMapper(productDetailStub());

    expect(result).toMatchSnapshot();
  });
});
