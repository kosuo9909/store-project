import {
  IFormBuilderProps,
  IFormBuilderReturn,
  ValidationErrors,
} from '../interfaces/interfaces';
import { useNavigate } from 'react-router';
import React, { useCallback, useEffect, useState } from 'react';
import { validateFields } from '../helpers/validate';
import { useIntl } from 'react-intl';

const useFormBuilder = <T extends Record<string, string | number>>({
  initialData,
  validationConfig,
  textFields,
  onSubmit,
  isEditing,
  editedData,
  context,
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
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const errors = validateFields(
        formData,
        validationConfig,
        textFields,
        intl,
        context,
      );

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
      } else {
        await onSubmit(formData);
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
      context,
    ],
  );
  useEffect(() => {
    console.log('OnSubmitChanged');
  }, [onSubmit]);
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
