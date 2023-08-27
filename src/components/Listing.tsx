import { ICar } from './interfaces/interfaces';
import SingleListing from './SingleListing';

interface SingleListingProps {
  storage: ICar[];
}

export default function Listing({ storage }: SingleListingProps) {
  return (
    <div className='div-wrap'>
      {storage.map((car) => (
        <SingleListing car={car} button='view' key={car.id} />
      ))}
    </div>
  );
}
