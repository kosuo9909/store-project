import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { fetchCars, selectCar } from '../redux/reducers/carsReducer';
import { useIntl } from 'react-intl';
import { formatTimeElapsed } from '../helpers/formatTimeElapsed';
import { ICar } from '../interfaces/interfaces';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../store/store';

const Shop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const storedCars = useSelector((state: RootState) => state.cars.value);
  const intl = useIntl();
  const minWidth = 140;
  const rowsData: ICar[] = storedCars;

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const columns: GridColDef[] = [
    {
      field: 'make',
      headerName: intl.formatMessage({
        id: 'car.make',
        defaultMessage: 'Make',
      }),
      minWidth: minWidth,
      valueGetter: (params) => (params.row.make ? params.row.make : ''),
    },
    {
      field: 'model',
      headerName: intl.formatMessage({
        id: 'car.model',
        defaultMessage: 'Model',
      }),
      minWidth: minWidth,
      valueGetter: (params) => (params.row.model ? params.row.model : ''),
    },
    {
      field: 'year',
      headerName: intl.formatMessage({
        id: 'car.year',
        defaultMessage: 'Year',
      }),
      minWidth: minWidth,
      valueGetter: (params) => (params.row.year ? params.row.year : ''),
      type: 'number',
    },
    {
      field: 'mileageColumn',
      headerName: intl.formatMessage({
        id: 'car.mileageColumn',
        defaultMessage: 'Mileage',
      }),
      minWidth: minWidth,
      type: 'number',
      valueGetter: (params) =>
        params.row.mileageColumn ? params.row.mileageColumn : '',
    },
    {
      field: 'fuelColumn',
      headerName: intl.formatMessage({
        id: 'car.fuelColumn',
        defaultMessage: 'Fuel',
      }),
      minWidth: minWidth,
      valueGetter: (params) =>
        params.row.fuelColumn ? params.row.fuelColumn : '',
    },
    {
      field: 'bhpColumn',
      headerName: intl.formatMessage({
        id: 'car.bhpColumn',
        defaultMessage: 'Horsepower',
      }),
      minWidth: minWidth,
      type: 'number',
      valueGetter: (params) =>
        params.row.bhpColumn ? params.row.bhpColumn : '',
    },
    {
      field: 'city',
      headerName: intl.formatMessage({
        id: 'car.city',
        defaultMessage: 'City',
      }),
      minWidth: minWidth,
      valueGetter: (params) => (params.row.city ? params.row.city : ''),
    },
    {
      field: 'country',
      headerName: intl.formatMessage({
        id: 'car.country',
        defaultMessage: 'Country',
      }),
      minWidth: minWidth,
      valueGetter: (params) => (params.row.country ? params.row.country : ''),
    },
    {
      field: 'price',
      headerName: intl.formatMessage({
        id: 'car.price',
        defaultMessage: 'Price',
      }),
      minWidth: minWidth,
      type: 'number',
      valueGetter: (params) => (params.row.price ? params.row.price : ''),
    },
    {
      field: 'description',
      headerName: intl.formatMessage({
        id: 'car.description',
        defaultMessage: 'Description',
      }),
      minWidth: minWidth,
      valueGetter: (params) =>
        params.row.description ? params.row.description : '',
    },

    {
      field: 'datePosted',
      headerName: intl.formatMessage({ id: 'timestamp.datePosted' }),
      minWidth: 200,
      type: 'dateTime',
      valueGetter: (params) => {
        return new Date(params.value);
      },
      renderCell: (params: GridCellParams) => {
        const datePosted = params.value as Date;

        return formatTimeElapsed(datePosted, intl);
      },
    },

    {
      field: 'actions',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      width: minWidth,
      renderCell: (params: GridCellParams) => {
        const handleViewCar = (id: string) => {
          dispatch(selectCar(id));
        };
        const id = params.row.id;
        return (
          <Link to={`/${id}`}>
            <Button onClick={() => handleViewCar(id)} size="small">
              {intl.formatMessage({ id: 'button.viewListing' })}
            </Button>
          </Link>
        );
      },
    },
  ];
  const CustomNoRowsOverlay = () => {
    return <div></div>;
  };

  return (
    <main>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rowsData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </Box>
    </main>
  );
};

export default Shop;
