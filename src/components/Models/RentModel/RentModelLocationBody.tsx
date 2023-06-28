'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import Heading from '@/src/components/Heading';
import CountrySelect from '@/src/components/Inputs/CountrySelect';
import { CountrySelectType } from '@/src/types/CountrySelect';
import { CreateListingRequest } from '@/src/validators/CreateListing';

type RentModelLocationBodyProps = {
  location?: CountrySelectType | null;
  onSelect: (id: keyof CreateListingRequest, value: any) => void;
};

const RentModelLocationBody: React.FC<RentModelLocationBodyProps> = ({
  location,
  onSelect,
}) => {
  const Map = useMemo(
    () => dynamic(() => import('@/src/components/Map'), { ssr: false }),
    [location],
  );
  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where is your place located?'
        subtitle='Help guests find you!'
      />
      <CountrySelect
        value={location}
        onChange={(value) => onSelect('location', value)}
      />
      <Map center={location?.latlng} />
    </div>
  );
};

export default RentModelLocationBody;
