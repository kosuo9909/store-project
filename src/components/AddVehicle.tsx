import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { IAddVehicle, ICar } from './interfaces/interfaces';
import './AddVehicle.scss';
import { textFields } from './helpers/gridListFields';
import React from 'react';
import { useIntl } from 'react-intl';
import useAddOrEdit from './hooks/useAddOrEdit';

const AddVehicle: React.FC<IAddVehicle> = ({
  addOrEdit = 'add',
}: IAddVehicle) => {
  const intl = useIntl();
  const {
    handleChange,
    handleClear,
    handleEdit,
    handleSubmit,
    validationErrors,
    formData,
  } = useAddOrEdit(addOrEdit);
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
