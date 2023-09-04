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
  const mockOnSubmit = jest.fn();

  it('shoult have the correct initial state (empty)', () => {
    const initialData = { name: '', age: '' };

    const { result } = renderHook(
      () =>
        useFormBuilder({
          initialData: initialData,
          validationConfig: {},
          textFields: {},
          onSubmit: mockOnSubmit,
          context: '',
        }),
      { wrapper },
    );

    expect(result.current.formData).toEqual(initialData);
  });
  it('should handle changes correctly', () => {
    const initialData = { username: 'peter' };

    const { result } = renderHook(
      () =>
        useFormBuilder({
          initialData: initialData,
          validationConfig: {},
          textFields: {},
          onSubmit: mockOnSubmit,
          context: '',
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
  it('should clear the form', () => {
    const initialData = {};

    const { result } = renderHook(
      () =>
        useFormBuilder({
          initialData: initialData,
          validationConfig: {},
          textFields: {},
          onSubmit: mockOnSubmit,
          context: '',
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

      result.current.handleClear({
        preventDefault: jest.fn(),
      } as unknown as React.MouseEvent<HTMLButtonElement>);
    });

    expect(result.current.formData).toEqual({});
  });

  it('should update formData when isEditing and editedData changes', () => {
    const initialProps = {
      initialData: {},
      validationConfig: {},
      textFields: {},
      onSubmit: mockOnSubmit,
      context: '',
      isEditing: false,
      editedData: {},
    };

    const { result, rerender } = renderHook((props) => useFormBuilder(props), {
      initialProps,
      wrapper,
    });

    rerender({
      initialData: {},
      validationConfig: {},
      textFields: {},
      onSubmit: mockOnSubmit,
      context: '',
      isEditing: true,
      editedData: { name: 'John', email: 'john@gmail.com' },
    });

    expect(result.current.formData).toEqual({
      name: 'John',
      email: 'john@gmail.com',
    });
  });
});
