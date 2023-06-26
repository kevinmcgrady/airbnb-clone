'use client';

import { Listing, Reservation , User } from '@prisma/client';
import { User as AuthUser } from 'next-auth';
import { useMemo } from 'react';

import Container from '@/app/components/Container';

import { categories } from './Categories';
import ListingHead from './ListingHead';
import ListingInfo from './ListingInfo';

type ListingProps = {
  listing: Listing & {
    user: User;
  };
  currentUser?: AuthUser | null;
  reservations?: Reservation[];
  hasFavorited?: boolean;
};

const Listing: React.FC<ListingProps> = ({
  listing,
  currentUser,
  hasFavorited,
}) => {
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
            hasFavorited={hasFavorited}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
