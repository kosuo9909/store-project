import React from 'react';

export interface ICar {
  id: string;
  today?: string;
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

export interface IUseAddOrEditProps {
  addOrEdit: 'add' | 'edit';
}

export interface IUseAddOrEditReturn {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  validationErrors: ValidationErrors;
  formData: Partial<ICar>;
}
