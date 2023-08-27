import { RootState } from './interfaces/interfaces';
import './CarDetail.scss';
import SingleListing from './SingleListing';
import { useSelector } from 'react-redux';

const CarDetail = () => {
  const car = useSelector((state: RootState) => state.cars.selectedCar);

  return <div>{car && <SingleListing car={car} button='edit & remove' />}</div>;
};

export default CarDetail;
