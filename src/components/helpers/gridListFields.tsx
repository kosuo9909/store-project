export const carTextFields: Record<string, string> = {
  make: 'Make',
  model: 'Model',
  year: 'Year',
  mileageColumn: 'Mileage',
  fuelColumn: 'Fuel',
  bhpColumn: 'Horsepower',
  city: 'City',
  country: 'Country',
  price: 'Price',
  description: 'Description',
};

export const initialCarFormData = Object.fromEntries(
  Object.keys(carTextFields).map((key) => [key, '']),
);
