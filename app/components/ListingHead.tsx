'use client';

import Image from 'next/image';
import { User } from 'next-auth';
import { Fragment } from 'react';

import useCountries from '../hooks/useCountries';
import Heading from './Heading';
import HeartButton from './HeartButton';

type ListingHeadProps = {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: User | null;
  hasFavorited?: boolean;
};

const ListingHead: React.FC<ListingHeadProps> = ({
  id,
  imageSrc,
  locationValue,
  title,
  currentUser,
  hasFavorited,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <Fragment>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image
          alt={title}
          src={imageSrc}
          fill
          className='object-cover w-full'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton
            listingId={id}
            currentUser={currentUser}
            hasFavorited={hasFavorited}
            isLoggedIn={!!currentUser}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ListingHead;
