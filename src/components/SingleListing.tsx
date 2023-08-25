import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface DetailsType {
  datePosted: string;
  brand: string;
  price: number;
  year: number;
  bhp: number;
  miles: number;
  fuel: string;
  description: string;
  city: string;
  country: string;
}

export default function SingleListing({ details }: { details: DetailsType }) {
  return (
    <div className='test'>
      <Box sx={{ minWidth: 275, maxWidth: 350 }}>
        <Card variant='outlined'>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              {details.datePosted}
            </Typography>
            <Typography variant='h5' component='div'>
              {details.brand}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {details.price} USD
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 1 }}>
              {details.year}, {details.fuel}, {details.miles} miles
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {details.description}
            </Typography>
            <Typography variant='body2' sx={{ marginTop: 1 }}>
              {details.city}, {details.country}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Visit listing</Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}
