import { carTextFields } from './gridListFields';

export type ValidatorFuncSignature = (
  value: string | number,
  key: string,
) => string | null;

const isRequired: ValidatorFuncSignature = (value, key) => {
  if (value === '') {
    return `${carTextFields[key as string]} is required.`;
  }
  return null;
};
const mustBeNumber: ValidatorFuncSignature = (value, key) => {
  if (isNaN(Number(value))) {
    return `${carTextFields[key as string]} must be a number.`;
  }
  return null;
};
const mustBePositive: ValidatorFuncSignature = (value, key) => {
  if (Number(value) < 0) {
    return `${carTextFields[key as string]} must be a positive number.`;
  }
  return null;
};
const isWithinRange =
  (min: number, max: number): ValidatorFuncSignature =>
  (value, key) => {
    const numValue = Number(value);
    if (numValue < min || numValue > max) {
      return `${
        carTextFields[key as string]
      } must be between ${min} and ${max}.`;
    }
    return null;
  };

export const carValidationConfig: Record<string, ValidatorFuncSignature[]> = {
  price: [isRequired, mustBeNumber, mustBePositive],
  make: [isRequired],
  model: [isRequired],
  year: [isRequired, mustBeNumber, isWithinRange(1886, 2024)],
  mileageColumn: [isRequired, mustBeNumber, mustBePositive],
  fuelColumn: [isRequired],
  bhpColumn: [isRequired],
  city: [isRequired],
  country: [isRequired],
  description: [isRequired],
};
