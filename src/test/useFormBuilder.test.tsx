import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import useFormBuilder from '../hooks/useFormBuilder';
import { renderHook } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { act } from 'react-dom/test-utils';
import { carValidationConfig } from '../helpers/validationConfigs';

describe('useFormBuilder', () => {
  let wrapper: React.FC<MemoryRouterProps>;
  let mockOnSubmit: jest.Mock;
  beforeEach(() => {
    wrapper = ({ children }: MemoryRouterProps) => (
      <IntlProvider locale="en">
        <MemoryRouter>{children}</MemoryRouter>
      </IntlProvider>
    );
  });

  beforeEach(() => {
    mockOnSubmit = jest.fn();
  });

  afterEach(() => {
    mockOnSubmit.mockReset();
  });

  it('should have the correct initial state (empty)', () => {
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

  it('should set validation errors if the form is invalid', async () => {
    const initialData = { make: '' };
    const { result } = renderHook(
      () =>
        useFormBuilder({
          initialData,
          validationConfig: carValidationConfig,
          textFields: {},
          onSubmit: mockOnSubmit,
          context: '',
        }),
      { wrapper },
    );

    await act(() => {
      result.current.handleFormAction({
        preventDefault: jest.fn(),
      } as unknown as React.MouseEvent<HTMLButtonElement>);
    });
    expect(mockOnSubmit).toHaveBeenCalledTimes(0);
    expect(result.current.validationErrors.make).toEqual(
      '.make cannot be empty.',
    );
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
