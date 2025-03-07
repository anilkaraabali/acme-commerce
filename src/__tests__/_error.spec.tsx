import { ErrorProps } from '@/components/error';
import CustomError from '@/pages/_error';
import { render, screen } from '@testing-library/react';
import { NextPageContext } from 'next';

describe('_error', () => {
  it('renders error page with correct status code', async () => {
    render(<CustomError messages={{}} statusCode={404} />);

    expect(screen.getByTestId('error-title')).toHaveTextContent('404.title');
  });

  it('handles server errors correctly', async () => {
    render(<CustomError messages={{}} statusCode={500} />);

    expect(screen.getByTestId('error-title')).toHaveTextContent('500.title');
  });

  it('handles client-side errors correctly', async () => {
    const errorMock = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});

    const mockCtx = {
      err: { message: 'Client-side issue' },
      locale: 'en',
      req: { url: '/mock-client-error' },
      res: { statusCode: 400 },
    } as NextPageContext;

    let props: ErrorProps = {
      messages: {},
      statusCode: 200,
    };

    if (CustomError.getInitialProps) {
      props = await CustomError.getInitialProps(mockCtx);
    }

    expect(props.statusCode).toBe(400);
    expect(errorMock).not.toHaveBeenCalled();

    errorMock.mockRestore();
  });
});
