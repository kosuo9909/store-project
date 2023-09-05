import { IntlShape } from 'react-intl';

export type ValidatorFuncSignature = (
  itemDict: Record<string, string>,
  value: string | number,
  key: string,
  intl: IntlShape,
  context: string,
) => string | null;

// const getFormatMessageConfig = (fieldName, type) => {
//     switch (type) {
//       case isRequired:
//         {
//           id: 'validation.error.isEmpty',
//           defaultMessage: '{fieldName} cannot be empty.',
//         },
//         { fieldName: fieldName },
//         break;
//       default:
//         break;
//     }
// }

export const isRequired: ValidatorFuncSignature = (
  itemDict,
  value,
  key,
  intl,
  context,
) => {
  if (value === '') {
    const fieldName = intl.formatMessage({ id: context + '.' + key });

    // let formatMessageConfig = getFormatMessageConfig(fieldName, 'isRequired');
    return intl.formatMessage(
      {
        id: 'validation.error.isEmpty',
        defaultMessage: '{fieldName} cannot be empty.',
      },
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
  context,
) => {
  if (isNaN(Number(value))) {
    const fieldName = intl.formatMessage({ id: context + '.' + key });

    return intl.formatMessage(
      {
        id: 'validation.error.isNotNumber',
        defaultMessage: '{fieldName} must be a number.',
      },
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
  context,
) => {
  if (Number(value) < 0) {
    const fieldName = intl.formatMessage({ id: context + '.' + key });
    return intl.formatMessage(
      {
        id: 'validation.error.isNotPositive',
        defaultMessage: '{fieldName} must be positive.',
      },
      { fieldName: fieldName },
    );
  }
  return null;
};

export const isWithinRange =
  (min: number, max: number): ValidatorFuncSignature =>
  (itemDict, value, key, intl, context) => {
    const numValue = Number(value);
    if (numValue < min || numValue > max) {
      const fieldName = intl.formatMessage({ id: context + '.' + key });
      return intl.formatMessage(
        {
          id: 'validation.error.isNotWithinRange',
          defaultMessage: '{fieldName} must be between {min} and {max}.',
        },
        { fieldName, min, max },
      );
    }
    return null;
  };
