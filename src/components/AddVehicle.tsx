import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { IAddVehicle, ICar } from '../interfaces/interfaces';
import './AddVehicle.scss';
import { carTextFields, initialCarFormData } from '../helpers/carFields';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import useFormBuilder from '../hooks/useFormBuilder';
import { useDispatch, useSelector } from 'react-redux';
import { addCar, editCar } from '../reducers/carsReducer';
import { RootState } from '../store/store';
import { carValidationConfig } from '../helpers/validationConfigs';

const AddVehicle: React.FC<IAddVehicle> = ({
  addOrEdit = 'add',
}: IAddVehicle) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const selectedCar = useSelector((state: RootState) => state.cars.selectedCar);
  const handleSubmit = useCallback(
    (formData: Partial<ICar>) => {
      if (addOrEdit === 'add') {
        dispatch(addCar(formData as ICar));
      } else {
        if (selectedCar) {
          const updatedCar = { ...formData };
          dispatch(editCar({ id: selectedCar?.id, updatedCar }));
        }
      }
    },
    [dispatch, addOrEdit, selectedCar],
  );

  // const handleSubmit = (formData: Partial<ICar>) => {
  //   if (addOrEdit === 'add') {
  //     dispatch(addCar(formData as ICar));
  //   } else {
  //     if (selectedCar) {
  //       const updatedCar = { ...formData };
  //       dispatch(editCar({ id: selectedCar?.id, updatedCar }));
  //     }
  //   }
  // };

  const {
    handleFormAction,
    handleChange,
    handleClear,
    validationErrors,
    formData,
  } = useFormBuilder<Partial<ICar>>({
    initialData: initialCarFormData,
    validationConfig: carValidationConfig,
    onSubmit: handleSubmit,
    isEditing: addOrEdit === 'edit' ? true : false,
    editedData: selectedCar,
    textFields: carTextFields,
    context: 'car',
  });

  return (
    <main>
      {addOrEdit === 'add' ? (
        <h2>{intl.formatMessage({ id: 'common.addVehicle' })}</h2>
      ) : (
        <h2>{intl.formatMessage({ id: 'common.editVehicle' })}</h2>
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
        {Object.entries(carTextFields).map(([name, label]) => (
          <TextField
            error={!!validationErrors[name]}
            helperText={validationErrors[name]}
            key={name}
            id={name}
            name={name}
            type="input"
            label={intl.formatMessage({ id: 'car.' + name })}
            value={formData[name as keyof Partial<ICar>]}
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
            {intl.formatMessage({ id: 'button.clear' })}
          </Button>
          <Button
            variant="contained"
            onClick={handleFormAction}
            endIcon={<SendIcon />}
          >
            {intl.formatMessage({ id: 'button.submit' })}
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
            {intl.formatMessage({ id: 'button.clear' })}
          </Button>
          <Button
            variant="contained"
            onClick={handleFormAction}
            endIcon={<SendIcon />}
          >
            {intl.formatMessage({ id: 'button.submit' })}
          </Button>
        </Stack>
      )}
    </main>
  );
};

export default AddVehicle;
