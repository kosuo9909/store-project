import { IntlShape } from 'react-intl';
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

export const getFormatMessageConfig = (
  intl: IntlShape,
  context: string,
  type: string,
  key: string,
  min?: number,
  max?: number,
) => {
  const fieldName = intl.formatMessage({ id: context + '.' + key });

  switch (type) {
    case 'isRequired':
      return intl.formatMessage(
        {
          id: 'validation.error.isEmpty',
          defaultMessage: '{fieldName} cannot be empty.',
        },
        { fieldName },
      );
    case 'mustBeNumber':
      return intl.formatMessage(
        {
          id: 'validation.error.isNotNumber',
          defaultMessage: '{fieldName} must be a number.',
        },
        { fieldName },
      );
    case 'mustBePositive':
      return intl.formatMessage(
        {
          id: 'validation.error.isNotPositive',
          defaultMessage: '{fieldName} must be positive.',
        },
        { fieldName },
      );
    case 'isWithinRange':
      return intl.formatMessage(
        {
          id: 'validation.error.isNotWithinRange',
          defaultMessage: '{fieldName} must be between {min} and {max}.',
        },
        { fieldName, min, max },
      );
    default:
      return '';
  }
};
