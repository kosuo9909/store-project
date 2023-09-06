import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { selectCar } from '../redux/reducers/carsReducer';
import { useIntl } from 'react-intl';
import { formatTimeElapsed } from '../helpers/formatTimeElapsed';
import axios from 'axios';

const Shop = () => {
  const carsFromRedux = useSelector((state: RootState) => state.cars.value);
  const rows = carsFromRedux.length > 0 ? carsFromRedux : [];
  const dispatch = useDispatch();
  const intl = useIntl();
  const minWidth = 140;

  const getCars = async () => {
    const response = await axios.get('/api/cars');

    return response.data;
  };

  console.log(getCars());

  const columns: GridColDef[] = [
    {
      field: 'make',
      headerName: intl.formatMessage({
        id: 'car.make',
        defaultMessage: 'Make',
      }),
      minWidth: minWidth,
      valueGetter: (params) =>
        params.row.car?.make ? params.row.car.make : '',
    },
    {
      field: 'model',
      headerName: intl.formatMessage({
        id: 'car.model',
        defaultMessage: 'Model',
      }),
      minWidth: minWidth,
      valueGetter: (params) =>
        params.row.car?.model ? params.row.car.model : '',
    },
    {
      field: 'year',
      headerName: intl.formatMessage({
        id: 'car.year',
        defaultMessage: 'Year',
      }),
      minWidth: minWidth,
      valueGetter: (params) =>
        params.row.car?.year ? params.row.car.year : '',

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
        params.row.car?.mileageColumn ? params.row.car.mileageColumn : '',
    },
    {
      field: 'fuelColumn',
      headerName: intl.formatMessage({
        id: 'car.fuelColumn',
        defaultMessage: 'Fuel',
      }),
      minWidth: minWidth,
      valueGetter: (params) =>
        params.row.car?.fuelColumn ? params.row.car.fuelColumn : '',
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
        params.row.car?.bhpColumn ? params.row.car.bhpColumn : '',
    },
    {
      field: 'city',
      headerName: intl.formatMessage({
        id: 'car.city',
        defaultMessage: 'City',
      }),
      minWidth: minWidth,
      valueGetter: (params) =>
        params.row.car?.city ? params.row.car.city : '',
    },
    {
      field: 'country',
      headerName: intl.formatMessage({
        id: 'car.country',
        defaultMessage: 'Country',
      }),
      minWidth: minWidth,
      valueGetter: (params) =>
        params.row.car?.country ? params.row.car.country : '',
    },
    {
      field: 'price',
      headerName: intl.formatMessage({
        id: 'car.price',
        defaultMessage: 'Price',
      }),
      minWidth: minWidth,
      type: 'number',
      valueGetter: (params) =>
        params.row.car?.price ? params.row.car.price : '',
    },
    {
      field: 'description',
      headerName: intl.formatMessage({
        id: 'car.description',
        defaultMessage: 'Description',
      }),
      minWidth: minWidth,
      valueGetter: (params) =>
        params.row.car?.description ? params.row.car.description : '',
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
    </main>
  );
};

export default Shop;
