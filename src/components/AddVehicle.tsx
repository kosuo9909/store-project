import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import './AddVehicle.scss';
import React, { useState } from 'react';
import { ICar } from './interfaces/interfaces';
import { useDispatch } from 'react-redux';
import { addCar } from '../reducers/carsReducer';

const textFields = [
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

const initialFormData = Object.fromEntries(
  textFields.map(([key]) => [key, ''])
);
console.log(initialFormData);

const AddVehicle = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<Partial<ICar>>(initialFormData);

  const [error, setError] = useState(false);

  const checkEmpty = (item: any) => item === '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (Object.values(formData).some(checkEmpty)) {
      setError(true);
      console.log(error);
    } else {
      dispatch(addCar(formData as ICar));
      setFormData({});
      setError(false);
    }
    console.log(formData);
  };

  return (
    <main>
      <h2>Add a vehicle</h2>
      <Box
        component='form'
        noValidate
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
        }}
      >
        {textFields.map(([name, label]) =>
          name === 'description' ? (
            <TextField
              error={formData[name as keyof ICar] === '' && error}
              helperText={
                formData[name as keyof ICar] === '' &&
                error &&
                'This field is required.'
              }
              key={name}
              id={name}
              name={name}
              type='input'
              label={label}
              value={
                formData[name as keyof ICar] ? formData[name as keyof ICar] : ''
              }
              placeholder={label}
              onChange={handleChange}
              multiline
            />
          ) : (
            <TextField
              error={formData[name as keyof ICar] === '' && error}
              helperText={
                formData[name as keyof ICar] === '' &&
                error &&
                'This field is required.'
              }
              key={name}
              id={name}
              name={name}
              type='input'
              label={label}
              value={
                formData[name as keyof ICar] ? formData[name as keyof ICar] : ''
              }
              placeholder={label}
              onChange={handleChange}
            />
          )
        )}
      </Box>
      <Stack direction='row' spacing={2}>
        <Button variant='outlined' startIcon={<DeleteIcon />}>
          Clear
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
      </Stack>
    </main>
  );
};

export default AddVehicle;
