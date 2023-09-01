import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { selectCar } from '../reducers/carsReducer';
import { useIntl } from 'react-intl';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

const Shop = () => {
  const rows = useSelector((state: RootState) => state.cars.value);
  const dispatch = useDispatch();
  const intl = useIntl();
  const minWidth = 150;
  const columns: GridColDef[] = [
    {
      field: 'make',
      headerName: intl.formatMessage({ id: 'make', defaultMessage: 'Make' }),
      minWidth: minWidth,
    },
    {
      field: 'model',
      headerName: intl.formatMessage({ id: 'model', defaultMessage: 'Model' }),
      minWidth: minWidth,
    },
    {
      field: 'year',
      headerName: intl.formatMessage({ id: 'year', defaultMessage: 'Year' }),
      minWidth: minWidth,
    },
    {
      field: 'mileageColumn',
      headerName: intl.formatMessage({
        id: 'mileageColumn',
        defaultMessage: 'Mileage',
      }),
      minWidth: minWidth,
    },
    {
      field: 'fuelColumn',
      headerName: intl.formatMessage({
        id: 'fuelColumn',
        defaultMessage: 'Fuel',
      }),
      minWidth: minWidth,
    },
    {
      field: 'bhpColumn',
      headerName: intl.formatMessage({
        id: 'bhpColumn',
        defaultMessage: 'Horsepower',
      }),
      minWidth: minWidth,
    },
    {
      field: 'city',
      headerName: intl.formatMessage({ id: 'city', defaultMessage: 'City' }),
      minWidth: minWidth,
    },
    {
      field: 'country',
      headerName: intl.formatMessage({
        id: 'country',
        defaultMessage: 'Country',
      }),
      minWidth: minWidth,
    },
    {
      field: 'price',
      headerName: intl.formatMessage({ id: 'price', defaultMessage: 'Price' }),
      minWidth: minWidth,
    },
    {
      field: 'description',
      headerName: intl.formatMessage({
        id: 'description',
        defaultMessage: 'Description',
      }),
      minWidth: minWidth,
    },
    {
      field: 'datePosted',
      headerName: 'Date Posted',
      minWidth: 180,
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
              {intl.formatMessage({ id: 'viewlisting' })}
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
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
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
  );
};

export default Shop;
