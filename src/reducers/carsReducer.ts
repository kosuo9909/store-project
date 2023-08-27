import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICar } from '../components/interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
interface CarState {
  value: ICar[];
}

const initialState: CarState = {
  value: [],
};

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<ICar>) => {
      let myID = uuidv4();
      const carWithDateAndID = {
        ...action.payload,
        datePosted: new Date().toISOString(),
        id: myID,
      };
      state.value.push(carWithDateAndID);
    },
    removeCar: (state, action) => {},
    editCar: (state, action) => {},
  },
});
