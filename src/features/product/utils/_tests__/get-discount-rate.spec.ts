import { productGetDiscountRate } from '../get-discount-rate';

describe('productGetDiscountRate', () => {
  const price = { currency: '$', value: 100 };

  it('should return null when there is no sale price', () => {
    const result = productGetDiscountRate(price, null);

    expect(result).toBeNull();
  });

  it('should return null if the discount is 0%', () => {
    const result = productGetDiscountRate(price, { currency: '$', value: 100 });

    expect(result).toBeNull();
  });

  it('should return a discount percentage when there is a valid discount', () => {
    const result = productGetDiscountRate(price, { currency: '$', value: 75 });

    expect(result).toBe('-25%');
  });

  it('should return a discount percentage rounded down', () => {
    const result = productGetDiscountRate(price, { currency: '$', value: 85 });

    expect(result).toBe('-15%');
  });

  it('should handle case where sale price is greater than price', () => {
    const result = productGetDiscountRate(price, { currency: '$', value: 120 });

    expect(result).toBeNull();
  });
});
