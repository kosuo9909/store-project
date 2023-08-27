import { configureStore } from '@reduxjs/toolkit';
import carReducer from '../reducers/carsReducer';

const storedState = localStorage.getItem('reduxState');

const preloadedState = storedState ? JSON.parse(storedState) : {};

export const store = configureStore({
  reducer: { cars: carReducer },
  preloadedState: preloadedState,
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});
