import { productGetUtmParams } from '../get-utm-params';

describe('productGetUtmParams', () => {
  it('should generate correct UTM params for mobile platform', () => {
    const result = productGetUtmParams('mobile');

    expect(result).toBe(
      '?utm_campaign=productShare&utm_medium=web_mobile&utm_source=sharing'
    );
  });

  it('should generate correct UTM params for tablet platform', () => {
    const result = productGetUtmParams('tablet');

    expect(result).toBe(
      '?utm_campaign=productShare&utm_medium=web_tablet&utm_source=sharing'
    );
  });

  it('should generate correct UTM params for desktop platform', () => {
    const result = productGetUtmParams('desktop');

    expect(result).toBe(
      '?utm_campaign=productShare&utm_medium=web_desktop&utm_source=sharing'
    );
  });

  it('should default to mobile if no platform is provided', () => {
    const result = productGetUtmParams();

    expect(result).toBe(
      '?utm_campaign=productShare&utm_medium=web_mobile&utm_source=sharing'
    );
  });
});
