import { IntlShape } from 'react-intl';

export type ValidatorFuncSignature = (
  itemDict: Record<string, string>,
  value: string | number,
  key: string,
  intl: IntlShape,
) => string | null;

const isRequired: ValidatorFuncSignature = (itemDict, value, key, intl) => {
  if (value === '') {
    return intl.formatMessage({ id: itemDict[key as string] + 'IsEmptyError' });
  }
  return null;
};
const mustBeNumber: ValidatorFuncSignature = (itemDict, value, key, intl) => {
  if (isNaN(Number(value))) {
    return intl.formatMessage({ id: itemDict[key as string] + 'IsNaN' });
  }
  return null;
};
const mustBePositive: ValidatorFuncSignature = (itemDict, value, key, intl) => {
  if (Number(value) < 0) {
    console.log(`well, ${itemDict[key]} is ${value} that positive bro?`);
    return intl.formatMessage({
      id: itemDict[key as string] + 'MustBePositive',
    });
  }

  return null;
};
const isWithinRange =
  (min: number, max: number): ValidatorFuncSignature =>
  (itemDict, value, key, intl) => {
    const numValue = Number(value);
    if (numValue < min || numValue > max) {
      return intl.formatMessage(
        {
          id: itemDict[key as string] + 'MustBeInRange',
        },
        { min, max },
      );
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
  bhpColumn: [isRequired, mustBePositive],
  city: [isRequired],
  country: [isRequired],
  description: [isRequired],
};
