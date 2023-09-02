import { ValidationErrors } from '../interfaces/interfaces';
import { carValidationConfig } from './validationConfigs';
import { ValidatorFuncSignature } from './validationConfigs';

export const validateFields = (
  data: Record<string, string | number>,
  config: Record<string, ValidatorFuncSignature[]>,
  itemDict: Record<string, string>,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(config).forEach((key) => {
    const value = data[key];

    const validationFuncsToBeChecked = carValidationConfig[key];

    for (const validationFunction of validationFuncsToBeChecked) {
      const error = validationFunction(itemDict, value, key);
      if (error) {
        errors[key] = error;
        break;
      }
    }
  });

  return errors;
};
