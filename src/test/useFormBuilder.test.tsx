import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import useFormBuilder from '../hooks/useFormBuilder';
import { renderHook } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { act } from 'react-dom/test-utils';

describe('useFormBuilder', () => {
  const wrapper = ({ children }: MemoryRouterProps) => (
    <IntlProvider locale="en">
      <MemoryRouter>{children}</MemoryRouter>
    </IntlProvider>
  );
  it('should handle changes correctly', () => {
    const mockOnSubmit = jest.fn();

    const initialData = { username: 'peter' };

    const { result } = renderHook(
      () =>
        useFormBuilder({
          initialData: initialData,
          validationConfig: {},
          textFields: {},
          onSubmit: mockOnSubmit,
        }),
      { wrapper },
    );

    act(() => {
      result.current.handleChange({
        target: {
          name: 'username',
          value: 'john',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.formData).toEqual({ username: 'john' });
  });
});
