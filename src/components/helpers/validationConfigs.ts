import { carTextFields } from './gridListFields';

export type ValidatorFuncSignature = (
  itemDict: Record<string, string>,
  value: string | number,
  key: string,
) => string | null;

const isRequired: ValidatorFuncSignature = (itemDict, value, key) => {
  if (value === '') {
    return `${itemDict[key as string]} is required.`;
  }
  return null;
};
const mustBeNumber: ValidatorFuncSignature = (itemDict, value, key) => {
  if (isNaN(Number(value))) {
    return `${itemDict[key as string]} must be a number.`;
  }
  return null;
};
const mustBePositive: ValidatorFuncSignature = (itemDict, value, key) => {
  if (Number(value) < 0) {
    return `${itemDict[key as string]} must be a positive number.`;
  }
  return null;
};
const isWithinRange =
  (
    itemDict: Record<string, string>,
    min: number,
    max: number,
  ): ValidatorFuncSignature =>
  (itemDict, value, key) => {
    const numValue = Number(value);
    if (numValue < min || numValue > max) {
      return `${itemDict[key as string]} must be between ${min} and ${max}.`;
    }
    return null;
  };

export const carValidationConfig: Record<string, ValidatorFuncSignature[]> = {
  price: [isRequired, mustBeNumber, mustBePositive],
  make: [isRequired],
  model: [isRequired],
  year: [isRequired, mustBeNumber, isWithinRange(carTextFields, 1886, 2024)],
  mileageColumn: [isRequired, mustBeNumber, mustBePositive],
  fuelColumn: [isRequired],
  bhpColumn: [isRequired],
  city: [isRequired],
  country: [isRequired],
  description: [isRequired],
};
