import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
const Add = () => {
  return (
    <FormControl>
      <FormLabel>Enter Name</FormLabel>
      <TextField></TextField>
      <Button>Submit</Button>
    </FormControl>
  );
};

export default Add;
