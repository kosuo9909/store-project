import { generateFormData } from './generateFormData';

export const userTextFields: Record<string, string> = {
  name: 'Name',
  lastName: 'Last name',
  age: 'Age',
  job: 'Job',
  city: 'City',
  country: 'Country',
};

export const initialUserFormData = generateFormData(userTextFields);
