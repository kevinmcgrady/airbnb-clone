'use client';

import { User } from '@prisma/client';
import dynamic from 'next/dynamic';

import useCountries from '../hooks/useCountries';
import { CategoryType } from '../types/Category';
import Avatar from './Avatar';
import ListingCategory from './ListingCategory';

const Map = dynamic(() => import('@/app/components/Map'), { ssr: false });

type ListingInfoProps = {
  user: User;
  category: CategoryType | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
};

const ListingInfo: React.FC<ListingInfoProps> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold flex flex-row items-center gap-2'>
          <p>Hosted by {user.name}</p>
          <Avatar src={user?.image} />
        </div>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathroomCount} bathrooms</p>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <p className='text-lg font-light text-neutral-500'>{description}</p>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
