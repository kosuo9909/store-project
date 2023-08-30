export interface ICar {
  today?: string;
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

export interface ValidationErrors {
  [key: string]: string;
}

export interface IAddVehicle {
  addOrEdit: 'add' | 'edit';
  car?: Partial<ICar>;
}
