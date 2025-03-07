import { Error } from '@/components/error';
import { render, screen } from '@testing-library/react';

describe('Error', () => {
  it('matches snapshot', () => {
    const { container } = render(<Error messages={{}} statusCode={500} />);

    expect(container).toMatchSnapshot();
  });

  it('renders correct title & detail for 404 error', () => {
    render(<Error messages={{}} statusCode={404} />);

    expect(screen.getByTestId('error-title')).toHaveTextContent('404.title');
    expect(screen.getByTestId('error-detail')).toHaveTextContent('404.detail');
  });

  it('renders correct title & detail for 500 error', () => {
    render(<Error messages={{}} statusCode={500} />);

    expect(screen.getByTestId('error-title')).toHaveTextContent('500.title');
    expect(screen.getByTestId('error-detail')).toHaveTextContent('500.detail');
  });

  it('uses fallback translation if statusCode is missing', () => {
    render(<Error messages={{}} statusCode={400} />);

    expect(screen.getByTestId('error-title')).toHaveTextContent('400.title');
    expect(screen.getByTestId('error-detail')).toHaveTextContent('400.detail');
  });

  it('renders the CTA button correctly', async () => {
    render(<Error messages={{}} statusCode={404} />);

    const button = screen.getByTestId('error-cta');

    expect(button).toHaveAttribute('href', '/');
  });
});
