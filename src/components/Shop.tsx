import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { selectCar } from '../reducers/carsReducer';

const columns: GridColDef[] = [
  {
    field: 'make',
    headerName: 'Make',
    width: 150,
  },
  {
    field: 'model',
    headerName: 'Model',
    width: 150,
  },
  {
    field: 'year',
    headerName: 'Year',
    width: 150,
  },
  {
    field: 'mileage',
    headerName: 'Mileage',
    width: 150,
  },
  {
    field: 'fuel',
    headerName: 'Fuel type',
    width: 150,
  },
  {
    field: 'bhp',
    headerName: 'Horsepower',
    width: 150,
  },
  {
    field: 'city',
    headerName: 'City',
    width: 150,
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 150,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
  },
  {
    field: 'datePosted',
    headerName: 'Date posted',
    width: 150,
  },
  {
    field: 'actions',
    headerName: 'View Listing',
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
            View Listing
          </Button>
        </Link>
      );
    },
  },
];

const Shop = () => {
  const rows = useSelector((state: RootState) => state.cars.value);

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
