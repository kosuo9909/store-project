import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import AddVehicle from './components/AddVehicle';
import { store } from './store/store';
import { Provider } from 'react-redux';
import CarDetail from './components/CarDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Shop />,
      },
      { path: 'add', element: <AddVehicle addOrEdit="add" /> },
      { path: 'edit', element: <AddVehicle addOrEdit="edit" /> },
      { path: ':carID', element: <CarDetail /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
);
