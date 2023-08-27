import Listing from './Listing';
import { useSelector } from 'react-redux';
import { RootState } from './interfaces/interfaces';

export default function Shop() {
  const storage = useSelector((state: RootState) => state.cars.value);
  console.log(storage);

  return (
    <div className='test'>
      <Listing storage={storage} />
    </div>
  );
}
