export const textFields = [
  ['make', 'Make'],
  ['model', 'Model'],
  ['year', 'Year'],
  ['mileage', 'Mileage'],
  ['fuel', 'Fuel'],
  ['bhp', 'Horsepower'],
  ['city', 'City'],
  ['country', 'Country'],
  ['price', 'Price'],
  ['description', 'Description'],
];

export const initialFormData = Object.fromEntries(
  textFields.map(([key]) => [key, '']),
);
