import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddVehicle from './components/AddVehicle';
import { store } from './store/store';
import { Provider } from 'react-redux';
import CarDetail from './components/CarDetail';
import Shop from './components/Shop';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import App from './App';
import User from './components/User';
import { setupMirageServer } from './server/server';

setupMirageServer();

const theme = createTheme({
  palette: {
    primary: {
      main: '#9775fa',
    },
    secondary: {
      main: '#E0C2FF',
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Shop />,
      },
      { path: 'add', element: <AddVehicle addOrEdit="add" /> },
      { path: 'edit', element: <AddVehicle addOrEdit="edit" /> },
      { path: ':carID', element: <CarDetail /> },
      { path: 'user', element: <User /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
