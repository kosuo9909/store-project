import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import './AddVehicle.scss';
import React from 'react';
import { useIntl } from 'react-intl';
import useFormBuilder from '../hooks/useFormBuilder';
import { userValidationConfig } from '../helpers/validationConfigs';
import { IUser } from '../interfaces/interfaces';
import { initialUserFormData, userTextFields } from '../helpers/userFields';

const User: React.FC = () => {
  const intl = useIntl();
  const handleSubmit = (formData: Partial<IUser>) => {
    console.log('dispatched' + formData);
  };
  const {
    handleFormAction,
    handleChange,
    handleClear,
    validationErrors,
    formData,
  } = useFormBuilder<Partial<IUser>>({
    initialData: initialUserFormData,
    validationConfig: userValidationConfig,
    onSubmit: handleSubmit,
    textFields: userTextFields,
  });

  return (
    <main>
      <h2>{intl.formatMessage({ id: 'user' })}</h2>
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
        {Object.entries(userTextFields).map(([name, label]) => (
          <TextField
            error={!!validationErrors[name]}
            helperText={validationErrors[name]}
            key={name}
            id={name}
            name={name}
            type="input"
            value={formData[name as keyof Partial<IUser>]}
            label={intl.formatMessage({ id: name })}
            placeholder={label}
            onChange={handleChange}
          />
        ))}
      </Box>
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
          onClick={handleFormAction}
          endIcon={<SendIcon />}
        >
          {intl.formatMessage({ id: 'submit' })}
        </Button>
      </Stack>
    </main>
  );
};

export default User;
