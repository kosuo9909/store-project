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

export interface RootState {
  cars: {
    value: ICar[];
    selectedCar?: ICar;
  };
}
