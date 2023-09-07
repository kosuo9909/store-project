import { IntlShape } from 'react-intl';
import { getFormatMessageConfig } from './validationConfigs';

export type ValidatorFuncSignature = (
  itemDict: Record<string, string>,
  value: string | number,
  key: string,
  intl: IntlShape,
  context: string,
) => string | null;

export const isRequired: ValidatorFuncSignature = (
  itemDict,
  value,
  key,
  intl,
  context,
) => {
  if (value === '') {
    return getFormatMessageConfig(intl, context, 'isRequired', key);
  }
  return null;
};

export const mustBeNumber: ValidatorFuncSignature = (
  itemDict,
  value,
  key,
  intl,
  context,
) => {
  if (isNaN(Number(value))) {
    return getFormatMessageConfig(intl, context, 'mustBeNumber', key);
  }
  return null;
};

export const mustBePositive: ValidatorFuncSignature = (
  itemDict,
  value,
  key,
  intl,
  context,
) => {
  if (Number(value) < 0) {
    return getFormatMessageConfig(intl, context, 'mustBePositive', key);
  }
  return null;
};

export const isWithinRange =
  (min: number, max: number): ValidatorFuncSignature =>
  (itemDict, value, key, intl, context) => {
    const numValue = Number(value);
    if (numValue < min || numValue > max) {
      return getFormatMessageConfig(
        intl,
        context,
        'isWithinRange',
        key,
        min,
        max,
      );
    }
    return null;
  };
