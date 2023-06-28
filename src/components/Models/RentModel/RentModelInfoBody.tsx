'use client';

import Heading from '@/src/components/Heading';
import Counter from '@/src/components/Inputs/Counter';
import { CreateListingRequest } from '@/src/validators/CreateListing';

type RentModelInfoBodyProps = {
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  onSelect: (id: keyof CreateListingRequest, value: any) => void;
};

const RentModelInfoBody: React.FC<RentModelInfoBodyProps> = ({
  bathroomCount,
  guestCount,
  onSelect,
  roomCount,
}) => {
  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Share some basics about your place'
        subtitle='What amenities do you have?'
      />
      <Counter
        title='Guests'
        subtitle='How many guests do you allow?'
        value={guestCount}
        onChange={(value) => onSelect('guestCount', value)}
      />
      <hr />
      <Counter
        title='Rooms'
        subtitle='How many rooms do you have?'
        value={roomCount}
        onChange={(value) => onSelect('roomCount', value)}
      />
      <hr />
      <Counter
        title='Bathrooms'
        subtitle='How many bathrooms do you have?'
        value={bathroomCount}
        onChange={(value) => onSelect('bathroomCount', value)}
      />
    </div>
  );
};

export default RentModelInfoBody;
