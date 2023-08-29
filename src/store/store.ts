import { configureStore } from '@reduxjs/toolkit';
import carReducer from '../reducers/carsReducer';
import localeSlice from '../reducers/localeReducer';

const storedState = localStorage.getItem('reduxState');

const preloadedState = storedState ? JSON.parse(storedState) : {};

export const store = configureStore({
  reducer: { cars: carReducer, locale: localeSlice },
  preloadedState: preloadedState,
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
