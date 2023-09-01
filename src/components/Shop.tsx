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
  const dispatch = useDispatch();
  const intl = useIntl();
  const minWidth = 150;
  const columns: GridColDef[] = [
    {
      field: 'make',
      headerName: intl.formatMessage({ id: 'make' }),
      minWidth: minWidth,
    },
    {
      field: 'model',
      headerName: intl.formatMessage({ id: 'model' }),
      minWidth: minWidth,
    },
    {
      field: 'year',
      headerName: intl.formatMessage({ id: 'year' }),
      minWidth: minWidth,
    },
    {
      field: 'mileage',
      headerName: intl.formatMessage({ id: 'mileage' }),
      minWidth: minWidth,
    },
    {
      field: 'fuel',
      headerName: intl.formatMessage({ id: 'fuel' }),
      minWidth: minWidth,
    },
    {
      field: 'bhp',
      headerName: intl.formatMessage({ id: 'bhp' }),
      minWidth: minWidth,
    },
    {
      field: 'city',
      headerName: intl.formatMessage({ id: 'city' }),
      minWidth: minWidth,
    },
    {
      field: 'country',
      headerName: intl.formatMessage({ id: 'country' }),
      minWidth: minWidth,
    },
    {
      field: 'price',
      headerName: intl.formatMessage({ id: 'price' }),
      minWidth: minWidth,
    },
    {
      field: 'description',
      headerName: intl.formatMessage({ id: 'description' }),
      minWidth: minWidth,
    },
    {
      field: 'datePosted',
      headerName: 'Date Posted',
      minWidth: 180,
      renderCell: (params: GridCellParams) => {
        const datePosted = params.value as Date;

        return intl.formatDate(datePosted, {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
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
