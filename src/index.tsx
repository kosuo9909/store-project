import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddVehicle from './components/AddVehicle';
import { store } from './store/store';
import { Provider } from 'react-redux';
import CarDetail from './components/CarDetail';
import Shop from './components/Shop';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { IntlProvider } from 'react-intl';
import { messages } from './i18n/messages';

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

const locale = JSON.parse(localStorage.getItem('reduxState') || '').locale
  .locale;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale="bg-BG"
      >
        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>
      </IntlProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
