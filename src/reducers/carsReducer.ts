import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICar } from '../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
interface CarState {
  value: ICar[];
  selectedCar?: ICar;
}

interface EditCarPayload {
  id: string;
  updatedCar: Partial<ICar>;
}

const initialState: CarState = {
  value: [],
  selectedCar: undefined,
};

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<ICar>) => {
      const myID = uuidv4();
      const carWithDateAndID = {
        ...action.payload,
        datePosted: new Date().toISOString(),
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
    editCar: (state, action: PayloadAction<EditCarPayload>) => {
      const { id, updatedCar } = action.payload;
      const carIndex = state.value.findIndex((item) => item.id === id);

      if (carIndex !== -1) {
        state.value[carIndex] = { ...state.value[carIndex], ...updatedCar };
      }
    },
  },
});

export const { addCar, removeCar, editCar, selectCar } = carSlice.actions;
export default carSlice.reducer;
