import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICar } from '../../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
interface CarState {
  value: ICar[];
  selectedCar?: ICar;
}

interface EditCarPayload {
  id: string;
  updatedCar: Partial<ICar>;
}

interface EditCarArgs {
  carObj: Partial<ICar>;
  carID: Partial<ICar>;
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
  extraReducers: (builder) => {
    builder
      .addCase(postCars.fulfilled, (state, action) => {
        console.log('This would do something once postCars is intercepted');
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        console.log('This would do something once fetchCars is intercepted');
      })
      .addCase(removeCarAPI.fulfilled, (state, action) => {
        console.log('This would do something once removeCarAPI is intercepted');
      })
      .addCase(editCars.fulfilled, (state, action) => {
        console.log('This would do something once editCars is intercepted');
      });
  },
});

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

interface EditCarArgs {
  carObj: Partial<ICar>;
  carID: Partial<ICar>;
}

export const editCars = createAsyncThunk(
  'cars/editCars/',
  async ({ carObj, carID }: EditCarArgs) => {
    try {
      const response = await axios.put(`/api/cars/${carID}`, carObj);
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
  async (carID: Partial<ICar>) => {
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

export const { addCar, removeCar, editCar, selectCar } = carSlice.actions;
export default carSlice.reducer;
