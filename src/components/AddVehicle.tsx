import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import './AddVehicle.scss';
import React, { useState } from 'react';
import { ICar } from './interfaces/interfaces';

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

const AddVehicle = () => {
  const [formData, setFormData] = useState<Partial<ICar>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData({});
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
