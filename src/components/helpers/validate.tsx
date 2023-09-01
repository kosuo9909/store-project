import { ICar, ValidationErrors } from '../interfaces/interfaces';

export const validateFields = (data: Partial<ICar>): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof ICar];
    const numValue = Number(value);

    if (value === '') {
      errors[key] = 'This field is required.';
    } else if (Number.isNaN(numValue)) {
      if (key === 'price') {
        errors[key] = 'Price must be a number';
      }
      if (key === 'bhp') {
        errors[key] = 'Horsepower must be a number';
      }
      if (key === 'mileage') {
        errors[key] = 'Mileage must be a number';
      }
      if (key === 'year') {
        errors[key] = 'Year must be a number';
      }
    } else {
      if (key === 'price' && numValue <= 0) {
        errors[key] = 'The price has to be a positive number.';
      }
      if (key === 'bhp' && numValue <= 0) {
        errors[key] = 'The horsepower has to be a positive number.';
      }
      if (key === 'mileage' && numValue <= 0) {
        errors[key] = 'The mileage has to be a positive number.';
      }
      if (key === 'year' && (numValue > 2024 || numValue < 1886)) {
        errors[key] = 'The year must be between 1886 and 2024.';
      }
    }
  });

  return errors;
};
