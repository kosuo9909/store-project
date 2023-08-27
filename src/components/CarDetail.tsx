import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from './interfaces/interfaces';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import './CarDetail.scss';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { removeCar } from '../reducers/carsReducer';
import React from 'react';

const CarDetail = () => {
  const car = useSelector((state: RootState) => state.cars.selectedCar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeCar(id));
    navigate('/shop');
    console.log('done');
  };

  return (
    <div className='div-wrapper'>
      {car && (
        <Box sx={{ minWidth: 275, maxWidth: 350 }} key={car.id}>
          <Card variant='outlined'>
            <CardContent sx={{ minHeight: 200 }}>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                {car.datePosted}
              </Typography>
              <Typography variant='h5' component='div'>
                {car.make}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                {car.price} USD
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: 1 }}>
                {car.year}, {car.fuel}, {car.mileage} miles
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {car.description}
              </Typography>
              <Typography variant='body2' sx={{ marginTop: 1 }}>
                {car.city}, {car.country}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/${car.id}`}>
                <Button onClick={(e) => handleRemove(car.id, e)} size='small'>
                  Remove listing
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      )}
    </div>
  );
};

export default CarDetail;
