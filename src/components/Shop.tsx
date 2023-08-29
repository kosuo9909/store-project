import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { selectCar } from '../reducers/carsReducer';
import { useIntl } from 'react-intl';

const Shop = () => {
  const rows = useSelector((state: RootState) => state.cars.value);
  const intl = useIntl();
  const columns: GridColDef[] = [
    {
      field: 'make',
      headerName: intl.formatMessage({ id: 'make' }),
      width: 150,
    },
    {
      field: 'model',
      headerName: intl.formatMessage({ id: 'model' }),
      width: 150,
    },
    {
      field: 'year',
      headerName: intl.formatMessage({ id: 'year' }),
      width: 150,
    },
    {
      field: 'mileage',
      headerName: intl.formatMessage({ id: 'mileage' }),
      width: 150,
    },
    {
      field: 'fuel',
      headerName: intl.formatMessage({ id: 'fuel' }),
      width: 150,
    },
    {
      field: 'bhp',
      headerName: intl.formatMessage({ id: 'bhp' }),
      width: 150,
    },
    {
      field: 'city',
      headerName: intl.formatMessage({ id: 'city' }),
      width: 150,
    },
    {
      field: 'country',
      headerName: intl.formatMessage({ id: 'country' }),
      width: 150,
    },
    {
      field: 'price',
      headerName: intl.formatMessage({ id: 'price' }),
      width: 150,
    },
    {
      field: 'description',
      headerName: intl.formatMessage({ id: 'description' }),
      width: 150,
    },
    {
      field: 'datePosted',
      headerName: intl.formatMessage({ id: 'dateposted' }),
      width: 150,
    },
    {
      field: 'actions',
      // headerName: intl.formatMessage({ id: 'viewlisting' }),
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      width: 150,
      renderCell: (params: GridCellParams) => {
        const dispatch = useDispatch();

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
  return (
    <Box sx={{ height: 400, width: '100%' }}>
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
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Shop;
