export interface ICar {
  id: string;
  datePosted: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuel: string;
  bhp: number;
  city: string;
  country: string;
  price: number;
  description: string;
}

export interface IUser {
  name: string;
  lastName: string;
  age: number;
  job: string;
  city: string;
  country: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface IAddVehicle {
  addOrEdit: 'add' | 'edit';
  car?: Partial<ICar>;
}

export interface IUseAddOrEditProps {
  addOrEdit: 'add' | 'edit';
}
