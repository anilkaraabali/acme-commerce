import { render, screen } from '@testing-library/react';
import React from 'react';

import { ErrorBoundary } from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  const ThrowError = () => {
    throw new Error('Test Error');
  };

  it('renders children normally when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid='child'>No Errors</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('No Errors');
  });

  it('catches errors and displays the fallback UI', () => {
    const errorMock = jest.spyOn(console, 'error').mockImplementation();

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(errorMock).toHaveBeenCalled();
    expect(errorMock).toHaveBeenCalledWith(
      'Uncaught error:',
      expect.any(Error),
      expect.any(Object)
    );
    expect(screen.getByText('Oops, there is an error!')).toBeInTheDocument();

    errorMock.mockRestore();
  });
});
