import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICar } from '../../interfaces/interfaces';
import axios from 'axios';
interface CarState {
  value: ICar[];
  selectedCar?: ICar;
}

interface EditCarArgs {
  updatedCar: Partial<ICar>;
  carID: string;
}

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  try {
    const response = await axios.get('/api/cars');
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
});

export const editCars = createAsyncThunk(
  'cars/editCars/',
  async ({ updatedCar, carID }: EditCarArgs) => {
    try {
      const response = await axios.put('/api/cars/', { updatedCar, carID });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  },
);

export const removeCarAPI = createAsyncThunk(
  'cars/removeCars/',
  async (carID: string) => {
    try {
      const response = await axios.delete(`/api/cars/${carID}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  },
);

export const postCars = createAsyncThunk(
  'cars/postCars',
  async (carObj: Partial<ICar>) => {
    try {
      const response = await axios.post('/api/cars', carObj);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  },
);

const initialState: CarState = {
  value: [],
  selectedCar: undefined,
};

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    selectCar: (state, action: PayloadAction<string>) => {
      state.selectedCar = state.value.find((car) => car.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCars.fulfilled, (state, action) => {
        console.log('This would do something once postCars is intercepted');
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(removeCarAPI.fulfilled, (state, action) => {
        console.log('This would do something once removeCarAPI is intercepted');
        return {
          ...state,
          selectedCar: undefined,
        };
      })
      .addCase(editCars.fulfilled, (state, action) => {
        console.log('This would do something once editCars is intercepted');
      });
  },
});

export const { selectCar } = carSlice.actions;
export default carSlice.reducer;
