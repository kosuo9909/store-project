import { IntlShape } from 'react-intl';

export type ValidatorFuncSignature = (
  itemDict: Record<string, string>,
  value: string | number,
  key: string,
  intl: IntlShape,
) => string | null;

export const isRequired: ValidatorFuncSignature = (
  itemDict,
  value,
  key,
  intl,
) => {
  if (value === '') {
    return intl.formatMessage({ id: key + 'IsEmpty' });
  }
  return null;
};
export const mustBeNumber: ValidatorFuncSignature = (
  itemDict,
  value,
  key,
  intl,
) => {
  if (isNaN(Number(value))) {
    return intl.formatMessage({ id: key + 'IsNaN' });
  }
  return null;
};
export const mustBePositive: ValidatorFuncSignature = (
  itemDict,
  value,
  key,
  intl,
) => {
  if (Number(value) < 0) {
    return intl.formatMessage({
      id: key + 'MustBePositive',
    });
  }

  return null;
};
export const isWithinRange =
  (min: number, max: number): ValidatorFuncSignature =>
  (itemDict, value, key, intl) => {
    const numValue = Number(value);
    if (numValue < min || numValue > max) {
      return intl.formatMessage(
        {
          id: key + 'MustBeInRange',
        },
        { min, max },
      );
    }
    return null;
  };
