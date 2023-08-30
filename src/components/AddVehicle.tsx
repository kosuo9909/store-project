import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import React, { useCallback, useEffect, useState } from 'react';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addCar, editCar } from '../reducers/carsReducer';
import { useNavigate } from 'react-router';
import { ICar } from './interfaces/interfaces';
import { useIntl } from 'react-intl';
import './AddVehicle.scss';

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
  textFields.map(([key]) => [key, '']),
);

interface IAddVehicle {
  addOrEdit: 'add' | 'edit';
  car?: Partial<ICar>;
}

interface ValidationErrors {
  [key: string]: string;
}

const validateFields = (data: Partial<ICar>): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof ICar];

    if (value === '') {
      errors[key] = 'This field is required.';
    }

    if (key === 'price' && isNaN(Number(value))) {
      errors[key] = 'Price must be a number';
    }
    if (key === 'bhp' && isNaN(Number(value))) {
      errors[key] = 'Horsepower must be a number';
    }
    if (key === 'mileage' && isNaN(Number(value))) {
      errors[key] = 'Mileage must be a number';
    }
    if (key === 'year' && isNaN(Number(value))) {
      errors[key] = 'Year must be a number';
    }
  });

  return errors;
};

const AddVehicle: React.FC<IAddVehicle> = ({
  addOrEdit = 'add',
}: IAddVehicle) => {
  const dispatch = useDispatch();

  const intl = useIntl();

  const today = intl.formatMessage({ id: 'today' });

  const car = useSelector((state: RootState) => state.cars.selectedCar);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<ICar>>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );

  useEffect(() => {
    setFormData(initialFormData);
    if (addOrEdit === 'edit' && car) {
      setFormData(car);
    }
  }, [car, addOrEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const errors = validateFields(formData);

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
      } else {
        dispatch(addCar({ ...(formData as ICar), today }));
        setFormData({});
        navigate('/');
      }
    },
    [formData],
  );

  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const errors = validateFields(formData);

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
      } else {
        if (car) {
          dispatch(editCar({ id: car.id, updatedCar: formData }));
          setFormData({});
          navigate('/');
        }
      }
    },
    [formData],
  );

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(initialFormData);
  };

  return (
    <main>
      {addOrEdit === 'add' ? (
        <h2>{intl.formatMessage({ id: 'add' })}</h2>
      ) : (
        <h2>{intl.formatMessage({ id: 'edit' })}</h2>
      )}
      <Box
        component="form"
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
            error={!!validationErrors[name]}
            helperText={validationErrors[name]}
            key={name}
            id={name}
            name={name}
            type="input"
            label={intl.formatMessage({ id: name })}
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
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleClear}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            {intl.formatMessage({ id: 'clear' })}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            endIcon={<SendIcon />}
          >
            {intl.formatMessage({ id: 'submit' })}
          </Button>
        </Stack>
      )}
      {addOrEdit === 'edit' && (
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleClear}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            {intl.formatMessage({ id: 'clear' })}
          </Button>
          <Button
            variant="contained"
            onClick={handleEdit}
            endIcon={<SendIcon />}
          >
            {intl.formatMessage({ id: 'submit' })}
          </Button>
        </Stack>
      )}
    </main>
  );
};

export default AddVehicle;
