import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import './AddVehicle.scss';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function AddVehicle() {
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
        <TextField
          // error

          id='make'
          type='input'
          label='Make'
          placeholder='Make'
        />
        <TextField
          // error
          id='model'
          type='input'
          label='Model'
          placeholder='Model'
        />
        <TextField
          // error
          multiline
          id='year'
          type='input'
          label='Year'
          placeholder='Year'
        />
        <TextField
          // error
          multiline
          id='mileage'
          type='input'
          label='Mileage'
          placeholder='Mileage'
        />
        <TextField
          // error
          multiline
          id='fuel'
          type='input'
          label='Fuel'
          placeholder='Fuel'
        />
        <TextField
          // error
          multiline
          id='bhop'
          type='input'
          label='Horsepower'
          placeholder='Horsepower'
        />
        <TextField
          // error
          multiline
          id='city'
          type='input'
          label='City'
          placeholder='City'
        />
        <TextField
          // error
          multiline
          id='country'
          type='input'
          label='Country'
          placeholder='Country'
        />
        <TextField
          // error
          multiline
          id='price'
          type='input'
          label='Price'
          placeholder='Price'
        />
        <TextField
          // error
          multiline
          id='description'
          type='input'
          label='Description'
          placeholder='Brief description'
        />
      </Box>
      <Stack direction='row' spacing={2}>
        <Button variant='outlined' startIcon={<DeleteIcon />}>
          Clear
        </Button>
        <Button variant='contained' endIcon={<SendIcon />}>
          Submit
        </Button>
      </Stack>
    </main>
  );
}
