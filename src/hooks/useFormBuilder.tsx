import { ValidationErrors } from '../interfaces/interfaces';
import { useNavigate } from 'react-router';
import React, { useCallback, useEffect, useState } from 'react';
import { validateFields } from '../helpers/validate';
import { ValidatorFuncSignature } from '../helpers/validationFuncs';
import { useIntl } from 'react-intl';

interface IFormBuilderReturn<T> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClear: (e: React.MouseEvent<HTMLButtonElement>) => void;
  validationErrors: Record<string, string | number>;
  formData: T;
}
interface IFormBuilderProps<T> {
  initialData: T;
  validationConfig: Record<string, ValidatorFuncSignature[]>;
  textFields: Record<string, string>;
  onSubmit: (data: T) => void;
  isEditing?: boolean;
  onEdit?: (key: keyof T, value: string | number) => void;
  editedData?: T;
}

const useFormBuilder = <T extends Record<string, string | number>>({
  initialData,
  validationConfig,
  textFields,
  onSubmit,
  isEditing,
  editedData,
}: IFormBuilderProps<T>): IFormBuilderReturn<T> => {
  const navigate = useNavigate();

  const intl = useIntl();

  const [formData, setFormData] = useState<T>(initialData);

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );

  useEffect(() => {
    if (isEditing && editedData) {
      setFormData(editedData);
    } else {
      setFormData(initialData);
    }
  }, [isEditing, editedData, initialData]);

  const handleFormAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const errors = validateFields(
        formData,
        validationConfig,
        textFields,
        intl,
      );

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
      } else {
        onSubmit(formData);
        navigate('/');
        setFormData(initialData);
      }
    },
    [
      formData,
      navigate,
      initialData,
      onSubmit,
      validationConfig,
      intl,
      textFields,
    ],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(initialData);
  };

  return {
    handleFormAction,
    handleChange,
    handleClear,
    validationErrors,
    formData,
  };
};

export default useFormBuilder;
