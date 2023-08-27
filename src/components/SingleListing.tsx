import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ICar } from './interfaces/interfaces';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectCar } from '../reducers/carsReducer';
import React from 'react';

interface SingleListingProps {
  storage: ICar[];
}

export default function SingleListing({ storage }: SingleListingProps) {
  const dispatch = useDispatch();

  const handleViewCar = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(selectCar(id));
  };
  return (
    <div className='test'>
      {storage.map((car) => (
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
                <Button onClick={(e) => handleViewCar(car.id, e)} size='small'>
                  Visit listing
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      ))}
    </div>
  );
}
