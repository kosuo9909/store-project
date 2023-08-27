import * as React from 'react';
import SingleListing from './SingleListing';
import { useSelector } from 'react-redux';
import { RootState } from './interfaces/interfaces';
import { Outlet } from 'react-router';

export default function Shop() {
  const storage = useSelector((state: RootState) => state.cars.value);
  console.log(storage);

  return (
    <div className='test'>
      <SingleListing storage={storage} />
    </div>
  );
}
