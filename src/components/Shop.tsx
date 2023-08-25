import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SingleListing from './SingleListing';

const storage = {
  brand: 'Ford Escort',
  price: 1444,
  year: 1992,
  bhp: 110,
  miles: 114556,
  fuel: 'diesel',
  city: 'Veliko Tarnovo',
  country: 'Bulgaria',
  datePosted: 'Today, 15:53 PM',
  description:
    'I have had this car for 17 years now and I cannot stand it anymore. Please someone buy it. Thanks!',
};

export default function Shop() {
  return (
    <div className='test'>
      <SingleListing details={storage} />
    </div>
  );
}
