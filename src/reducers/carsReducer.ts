import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICar } from '../components/interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { format, isToday } from 'date-fns';
interface CarState {
  value: ICar[];
  selectedCar?: ICar;
}

const initialState: CarState = {
  value: [],
  selectedCar: undefined,
};

const formatDate = (date: Date) => {
  if (isToday(date)) {
    return `Today, ${format(date, 'HH:mm a')}`;
  } else {
    return format(date, 'HH:mm a');
  }
};

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<ICar>) => {
      let myID = uuidv4();
      const carWithDateAndID = {
        ...action.payload,
        datePosted: formatDate(new Date()),
        id: myID,
      };
      state.value.push(carWithDateAndID);
    },
    removeCar: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((car) => car.id !== action.payload);
    },
    selectCar: (state, action: PayloadAction<string>) => {
      state.selectedCar = state.value.find((car) => car.id === action.payload);
    },
    editCar: (state, action) => {},
  },
});

export const { addCar, removeCar, editCar, selectCar } = carSlice.actions;
export default carSlice.reducer;
