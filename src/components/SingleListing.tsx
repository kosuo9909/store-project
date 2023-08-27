import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ICar } from './interfaces/interfaces';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeCar, selectCar } from '../reducers/carsReducer';
import React from 'react';

interface SingleListingProps {
  car: ICar;
  button: 'view' | 'edit & remove';
}

export default function SingleListing({ car, button }: SingleListingProps) {
  const dispatch = useDispatch();

  const handleViewCar = (id: string) => {
    dispatch(selectCar(id));
  };

  const navigate = useNavigate();

  const handleRemove = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeCar(id));
    navigate('/');
    console.log('done');
  };

  const typographySxProps = {
    maxWidth: 241,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    mb: 1,
  };
  return (
    <div className='test'>
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
            <Typography variant='h5' component='div' sx={typographySxProps}>
              {car.make} {car.model}
            </Typography>
            <Typography sx={typographySxProps} color='text.secondary'>
              {car.price} USD
            </Typography>
            <Typography variant='body2' sx={typographySxProps}>
              {car.mileage} miles
            </Typography>
            <Typography variant='body2' sx={typographySxProps}>
              Year of production - {car.year}
            </Typography>
            <Typography variant='body2' sx={typographySxProps}>
              Fuel type - {car.fuel}
            </Typography>
            <Typography variant='body2' sx={typographySxProps}>
              {car.bhp} bhp.
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={typographySxProps}
            >
              {car.description}
            </Typography>
            <Typography variant='body2' sx={typographySxProps}>
              {car.city}, {car.country}
            </Typography>
          </CardContent>
          <CardActions>
            {button === 'view' && (
              <Link to={`/${car.id}`}>
                <Button onClick={(e) => handleViewCar(car.id)} size='small'>
                  Visit listing
                </Button>
              </Link>
            )}
            {button === 'edit & remove' && (
              <>
                <Link to='/edit'>
                  <Button onClick={() => handleViewCar(car.id)} size='small'>
                    Edit
                  </Button>
                </Link>
                <Button onClick={(e) => handleRemove(car.id, e)} size='small'>
                  Remove
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}
