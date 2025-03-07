import { apiFetcher } from '../api-fetcher';

describe('apiFetcher', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return data and ok: true when response is ok', async () => {
    const mockData = { id: 1, name: 'Product 1' };
    const mockResponse = {
      json: jest.fn().mockResolvedValue(mockData),
      ok: true,
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const result = await apiFetcher({ url: '/products' });

    expect(result).toEqual({ data: mockData, ok: true });
  });

  it('should return error and ok: false when response is not ok', async () => {
    const mockResponse = {
      ok: false,
      statusText: 'Not Found',
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const result = await apiFetcher({ url: '/products' });

    expect(result).toEqual({
      data: null,
      error: new Error('Not Found'),
      ok: false,
    });
  });

  it('should return error and ok: false when fetch throws an error', async () => {
    const mockError = new Error('Network Error');

    global.fetch = jest.fn().mockRejectedValue(mockError);

    const result = await apiFetcher({ url: '/products' });

    expect(result).toEqual({
      data: null,
      error: mockError,
      ok: false,
    });
  });

  it('should call fetch with the correct arguments', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue({}),
      ok: true,
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await apiFetcher({ query: { page: 1 }, url: '/index' });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/products/index.json?page=1'),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  });

  it('should call mapper when provided', async () => {
    const mockData = { id: 1, name: 'Product 1' };
    const mockResponse = {
      json: jest.fn().mockResolvedValue(mockData),
      ok: true,
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const mapper = (data: typeof mockData) => ({
      ...data,
      name: data.name.toUpperCase(),
    });

    const result = await apiFetcher({ mapper });

    expect(result).toEqual({
      data: { id: 1, name: 'PRODUCT 1' },
      ok: true,
    });
  });
});
