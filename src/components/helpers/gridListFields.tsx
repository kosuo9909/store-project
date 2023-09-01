export const textFields = [
  ['make', 'Make'],
  ['model', 'Model'],
  ['year', 'Year'],
  ['mileageColumn', 'Mileage'],
  ['fuelColumn', 'Fuel'],
  ['bhpColumn', 'Horsepower'],
  ['city', 'City'],
  ['country', 'Country'],
  ['price', 'Price'],
  ['description', 'Description'],
];

export const initialFormData = Object.fromEntries(
  textFields.map(([key]) => [key, '']),
);
