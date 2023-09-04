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
    const fieldName = intl.formatMessage({ id: key });
    return intl.formatMessage(
      { id: 'cannotBeEmpty', defaultMessage: '{fieldName} cannot be empty.' },
      { fieldName: fieldName },
    );
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
    const fieldName = intl.formatMessage({ id: key });

    return intl.formatMessage(
      { id: 'mustBeNumber', defaultMessage: '{fieldName} must be a number.' },
      { fieldName: fieldName },
    );
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
    const fieldName = intl.formatMessage({ id: key });
    return intl.formatMessage(
      { id: 'mustBePositive', defaultMessage: '{fieldName} must be positive.' },
      { fieldName: fieldName },
    );
  }
  return null;
};

export const isWithinRange =
  (min: number, max: number): ValidatorFuncSignature =>
  (itemDict, value, key, intl) => {
    const numValue = Number(value);
    if (numValue < min || numValue > max) {
      const fieldName = intl.formatMessage({ id: key });
      return intl.formatMessage(
        {
          id: 'isWithinRange',
          defaultMessage: '{fieldName} must be between {min} and {max}.',
        },
        { fieldName, min, max },
      );
    }
    return null;
  };
