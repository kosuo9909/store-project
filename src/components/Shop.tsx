import Listing from './Listing';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Shop() {
  const storage = useSelector((state: RootState) => state.cars.value);

  return (
    <div>
      <Listing storage={storage} />
    </div>
  );
}
