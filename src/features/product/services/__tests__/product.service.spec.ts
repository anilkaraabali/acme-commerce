import { apiFetcher } from '@/services/api-fetcher';

import { productService } from '../product.service';
import { productDetailStub } from '../product-detail.stub';
import { productListingStub } from '../product-listing.stub';

jest.mock('@/services/api-fetcher', () => ({
  apiFetcher: jest.fn(),
}));

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getInstance', () => {
    it('should return the same instance', () => {
      const instance1 = productService;
      const instance2 = productService;

      expect(instance1).toBe(instance2);
    });
  });

  describe('fetchProductById', () => {
    it('fetchProductById should call apiFetcher with correct parameters', async () => {
      (apiFetcher as jest.Mock).mockResolvedValue(productDetailStub());

      await productService.fetchProductById('123');

      expect(apiFetcher).toHaveBeenCalledWith({
        mapper: expect.any(Function),
        url: '/123',
      });
    });

    it('fetchProductById should throw an error if apiFetcher fails', async () => {
      (apiFetcher as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(productService.fetchProductById('123')).rejects.toThrow(
        'API Error'
      );
    });
  });

  describe('fetchProducts', () => {
    it('fetchProducts should call apiFetcher with correct parameters', async () => {
      (apiFetcher as jest.Mock).mockResolvedValue(productListingStub());

      await productService.fetchProducts('/index');

      expect(apiFetcher).toHaveBeenCalledWith({
        mapper: expect.any(Function),
        url: '/index',
      });
    });

    it('fetchProducts should throw an error if apiFetcher fails', async () => {
      (apiFetcher as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(productService.fetchProducts('/index')).rejects.toThrow(
        'API Error'
      );
    });
  });
});
