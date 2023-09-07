import { RootState } from '../store/store';
import SingleListing from './SingleListing';
import { useSelector } from 'react-redux';
import './CarDetail.scss';
import { useParams } from 'react-router';

const CarDetail = () => {
  const params = useParams();
  console.log(params);

  const car = useSelector((state: RootState) => state.cars.selectedCar);

  return (
    <main>{car && <SingleListing car={car} button="edit & remove" />}</main>
  );
};

export default CarDetail;
