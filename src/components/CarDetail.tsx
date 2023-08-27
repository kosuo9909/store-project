import { RootState } from './interfaces/interfaces';
import SingleListing from './SingleListing';
import { useSelector } from 'react-redux';

const CarDetail = () => {
  const car = useSelector((state: RootState) => state.cars.selectedCar);

  return (
    <div className='div-wrap'>
      {car && <SingleListing car={car} button='edit & remove' />}
    </div>
  );
};

export default CarDetail;
