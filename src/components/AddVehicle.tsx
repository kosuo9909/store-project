import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import './AddVehicle.scss';
import React, { useEffect, useState } from 'react';
import { ICar, RootState } from './interfaces/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { addCar, editCar } from '../reducers/carsReducer';
import { useNavigate } from 'react-router';

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

interface IAddVehicle {
  addOrEdit: 'add' | 'edit';
  car?: Partial<ICar>;
}

const AddVehicle: React.FC<IAddVehicle> = ({
  addOrEdit = 'add',
}: IAddVehicle) => {
  const dispatch = useDispatch();

  const car = useSelector((state: RootState) => state.cars.selectedCar);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<ICar>>(initialFormData);

  const [error, setError] = useState(false);

  useEffect(() => {
    setFormData(initialFormData);
    if (addOrEdit === 'edit' && car) {
      setFormData(car);
    }
  }, [car, addOrEdit]);

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
    } else {
      dispatch(addCar(formData as ICar));
      setFormData({});
      setError(false);
      navigate('/');
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (Object.values(formData).some(checkEmpty)) {
      setError(true);
    } else {
      if (car) {
        dispatch(editCar({ id: car.id, updatedCar: formData }));
        setFormData({});
        setError(false);
        navigate('/');
      }
    }
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(initialFormData);
  };

  return (
    <div>
      {addOrEdit === 'add' ? <h2>Add a vehicle</h2> : <h2>Edit vehicle</h2>}
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
        {textFields.map(([name, label]) => (
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
            multiline={formData[name as keyof ICar] === 'description'}
          />
        ))}
      </Box>
      {addOrEdit === 'add' && (
        <Stack direction='row' spacing={2}>
          <Button
            onClick={handleClear}
            variant='outlined'
            startIcon={<DeleteIcon />}
          >
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
      )}
      {addOrEdit === 'edit' && (
        <Stack direction='row' spacing={2}>
          <Button
            onClick={handleClear}
            variant='outlined'
            startIcon={<DeleteIcon />}
          >
            Clear
          </Button>
          <Button
            variant='contained'
            onClick={handleEdit}
            endIcon={<SendIcon />}
          >
            Submit edit
          </Button>
        </Stack>
      )}
    </div>
  );
};

export default AddVehicle;
