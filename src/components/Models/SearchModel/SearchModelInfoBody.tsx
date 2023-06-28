'use client';

import Heading from '@/src/components/Heading';
import Counter from '@/src/components/Inputs/Counter';

type SearchModelInfoBodyProps = {
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  onGuestCountSelect: (value: number) => void;
  onRoomCountSelect: (value: number) => void;
  onBathroomSelect: (value: number) => void;
};

const SearchModelInfoBody: React.FC<SearchModelInfoBodyProps> = ({
  bathroomCount,
  guestCount,
  roomCount,
  onBathroomSelect,
  onGuestCountSelect,
  onRoomCountSelect,
}) => {
  return (
    <div className='flex flex-col gap-8'>
      <Heading title='More Information' subtitle='Find your perfect place' />
      <Counter
        title='Guests'
        subtitle='How many guests are coming?'
        value={guestCount}
        onChange={(value) => onGuestCountSelect(value)}
      />
      <Counter
        title='Rooms'
        subtitle='How many rooms do you need?'
        value={roomCount}
        onChange={(value) => onRoomCountSelect(value)}
      />
      <Counter
        title='Bathrooms'
        subtitle='How many bathrooms do you need?'
        value={bathroomCount}
        onChange={(value) => onBathroomSelect(value)}
      />
    </div>
  );
};

export default SearchModelInfoBody;
