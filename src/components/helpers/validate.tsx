import { IntlShape } from 'react-intl';
import { ValidationErrors } from '../interfaces/interfaces';
import { carValidationConfig } from './validationConfigs';
import { ValidatorFuncSignature } from './validationConfigs';

export const validateFields = (
  data: Record<string, string | number>,
  config: Record<string, ValidatorFuncSignature[]>,
  itemDict: Record<string, string>,
  intl: IntlShape,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(config).forEach((key) => {
    const value = data[key];

    const validationFuncsToBeChecked = carValidationConfig[key];

    for (const validationFunction of validationFuncsToBeChecked) {
      const error = validationFunction(itemDict, value, key, intl);
      if (error) {
        errors[key] = error;
        break;
      }
    }
  });

  return errors;
};
