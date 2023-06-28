'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import Heading from '@/src/components/Heading';
import CountrySelect from '@/src/components/Inputs/CountrySelect';
import { CountrySelectType } from '@/src/types/CountrySelect';

type SearchModelLocationBodyProps = {
  location?: CountrySelectType;
  onChange: (location: CountrySelectType) => void;
};

const SearchModelLocationBody: React.FC<SearchModelLocationBodyProps> = ({
  location,
  onChange,
}) => {
  const Map = useMemo(
    () => dynamic(() => import('@/src/components/Map'), { ssr: false }),
    [location],
  );

  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you wanna go?'
        subtitle='Find the perfect location'
      />
      <CountrySelect value={location} onChange={(value) => onChange(value)} />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );
};

export default SearchModelLocationBody;
