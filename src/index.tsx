import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import AddVehicle from './components/AddVehicle';
import Add from './components/Add';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      { path: 'shop', element: <Shop /> },
      { path: 'add', element: <AddVehicle /> },
      { path: 'cart', element: <Add /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
