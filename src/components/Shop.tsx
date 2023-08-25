import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SingleListing from './SingleListing';

const storage = {
  brand: 'Ford',
  price: 1444,
  year: 1992,
  bhp: 110,
  miles: 114556,
};

export default function Shop() {
  return (
    <div className='test'>
      <SingleListing details={storage} />
    </div>
  );
}
