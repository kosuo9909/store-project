import { ValidatorFuncSignature } from '../helpers/validationFuncs';

export interface ICar {
  id: string;
  datePosted: string;
  make: string;
  model: string;
  year: number;
  mileageColumn: number;
  fuelColumn: string;
  bhpColumn: number;
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

export interface IFormBuilderReturn<T> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClear: (e: React.MouseEvent<HTMLButtonElement>) => void;
  validationErrors: Record<string, string | number>;
  formData: T;
}
export interface IFormBuilderProps<T> {
  initialData: T;
  validationConfig: Record<string, ValidatorFuncSignature[]>;
  textFields: Record<string, string>;
  onSubmit: (data: T) => void;
  isEditing?: boolean;
  onEdit?: (key: keyof T, value: string | number) => void;
  editedData?: T;
  context: string;
}
