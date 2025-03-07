type FetcherArgs<RawData, Result> = {
  mapper?: (data: RawData) => Result;
  query?: Record<string, boolean | number | string>;
  requestInit?: RequestInit;
  url?: string;
};

type FetcherResult<Result> =
  | {
      data: Result;
      ok: true;
    }
  | {
      data: null;
      error: Error;
      ok: false;
    };

const apiFetcher = async <RawData, Result>({
  mapper,
  query = {},
  requestInit,
  url,
}: FetcherArgs<RawData, Result>): Promise<FetcherResult<Result>> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL!}/api/v1/products`;
  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();
  const finalUrl = `${baseUrl}${url}.json${queryString ? `?${queryString}` : ''}`;

  const init: RequestInit = {
    ...requestInit,
    headers: {
      'Content-Type': 'application/json',
      ...requestInit?.headers,
    },
  };

  if (process.env.TRACE) {
    // eslint-disable-next-line no-console
    console.log('apiFetcher', finalUrl, init);
  }

  try {
    const response = await fetch(finalUrl, init);

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error('[API_FETCHER]: Response is not ok:', response.statusText);

      throw new Error(response.statusText);
    }

    const data: RawData = await response.json();

    return {
      data: mapper ? mapper(data) : (data as unknown as Result),
      ok: true,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[API_FETCHER] Error:', err);

    return {
      data: null,
      error: err as Error,
      ok: false,
    };
  }
};

export type { FetcherArgs, FetcherResult };
export { apiFetcher };
