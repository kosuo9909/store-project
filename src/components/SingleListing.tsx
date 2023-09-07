import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ICar } from '../interfaces/interfaces';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeCarAPI, selectCar } from '../redux/reducers/carsReducer';
import React from 'react';
import { FormattedDate, useIntl } from 'react-intl';
import { AppDispatch } from '../store/store';

interface SingleListingProps {
  car: ICar;
  button: 'view' | 'edit & remove';
}

export default function SingleListing({ car, button }: SingleListingProps) {
  const intl = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  const handleViewCar = (id: string) => {
    dispatch(selectCar(id));
  };

  const navigate = useNavigate();

  const handleRemove = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeCarAPI(id));
    navigate('/');
  };

  const typographySxProps = {
    maxWidth: 300,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    mb: 1,
  };
  return (
    <Box sx={{ width: 330 }} key={car.id}>
      <Card variant="outlined">
        <CardContent sx={{ height: 320 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <FormattedDate value={car.datePosted} />
          </Typography>
          <Typography variant="h5" component="div" sx={typographySxProps}>
            {intl.formatMessage(
              { id: 'car.makeAndModel', defaultMessage: '{make} {model}' },
              { make: car.make, model: car.model },
            )}
          </Typography>
          <Typography sx={typographySxProps} color="text.secondary">
            {intl.formatMessage(
              { id: 'car.price.listing', defaultMessage: '{price} USD' },
              { price: car.price },
            )}
          </Typography>
          <Typography variant="body2" sx={typographySxProps}>
            {intl.formatMessage(
              { id: 'car.mileage', defaultMessage: 'Mileage - {mileageValue}' },
              { mileageValue: car.mileageColumn },
            )}
          </Typography>
          <Typography variant="body2" sx={typographySxProps}>
            {intl.formatMessage(
              {
                id: 'car.yearOfProduction',
                defaultMessage: 'Year of production - {year}',
              },
              { year: car.year },
            )}
          </Typography>
          <Typography variant="body2" sx={typographySxProps}>
            {intl.formatMessage(
              { id: 'car.fuel', defaultMessage: 'Fuel type - {fuelType}' },
              { fuelType: car.fuelColumn },
            )}
          </Typography>
          <Typography variant="body2" sx={typographySxProps}>
            {intl.formatMessage(
              { id: 'car.bhp', defaultMessage: 'Horsepower - {bhpValue}' },
              { bhpValue: car.bhpColumn },
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {intl.formatMessage({
              id: 'car.description',
              defaultMessage: 'Description',
            })}{' '}
            <br></br>
            {car.description}
          </Typography>
          <Typography variant="body2" sx={typographySxProps}>
            {intl.formatMessage(
              {
                id: 'car.listing.cityAndCountry',
                defaultMessage: '{city} {country}',
              },
              { city: car.city, country: car.country },
            )}
          </Typography>
        </CardContent>
        <CardActions>
          {button === 'view' && (
            <Link to={`/${car.id}`}>
              <Button onClick={() => handleViewCar(car.id)} size="small">
                {intl.formatMessage({
                  id: 'button.viewListing',
                  defaultMessage: 'View Listing',
                })}
              </Button>
            </Link>
          )}
          {button === 'edit & remove' && (
            <>
              <Link to="/edit">
                <Button onClick={() => handleViewCar(car.id)} size="small">
                  {intl.formatMessage({
                    id: 'button.edit',
                    defaultMessage: 'Edit',
                  })}
                </Button>
              </Link>
              <Button onClick={(e) => handleRemove(car.id, e)} size="small">
                {intl.formatMessage({
                  id: 'button.remove',
                  defaultMessage: 'Remove',
                })}
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}
