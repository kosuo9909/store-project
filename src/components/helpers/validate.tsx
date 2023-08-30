import { ICar, ValidationErrors } from '../interfaces/interfaces';

export const validateFields = (data: Partial<ICar>): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof ICar];

    if (value === '') {
      errors[key] = 'This field is required.';
    }

    if (key === 'price' && isNaN(Number(value))) {
      errors[key] = 'Price must be a number';
    }
    if (key === 'bhp' && isNaN(Number(value))) {
      errors[key] = 'Horsepower must be a number';
    }
    if (key === 'mileage' && isNaN(Number(value))) {
      errors[key] = 'Mileage must be a number';
    }
    if (key === 'year' && isNaN(Number(value))) {
      errors[key] = 'Year must be a number';
    }
  });

  return errors;
};
