import {
  ValidatorFuncSignature,
  isRequired,
  isWithinRange,
  mustBeNumber,
  mustBePositive,
} from './validationFuncs';

export const carValidationConfig: Record<string, ValidatorFuncSignature[]> = {
  price: [isRequired, mustBeNumber, mustBePositive],
  make: [isRequired],
  model: [isRequired],
  year: [isRequired, mustBeNumber, isWithinRange(1886, 2024)],
  mileageColumn: [isRequired, mustBeNumber, mustBePositive],
  fuelColumn: [isRequired],
  bhpColumn: [isRequired, mustBePositive, mustBeNumber],
  city: [isRequired],
  country: [isRequired],
  description: [isRequired],
};
export const userValidationConfig: Record<string, ValidatorFuncSignature[]> = {
  name: [isRequired],
  lastName: [isRequired],
  age: [isRequired, mustBeNumber, mustBePositive],
  job: [isRequired],
  city: [isRequired],
  country: [isRequired],
};
