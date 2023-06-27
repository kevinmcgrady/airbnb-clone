'use client';

import { Listing } from '@prisma/client';
import { User } from 'next-auth';

import Container from '../Container';
import Heading from '../Heading';
import ListingCard from '../Listings/ListingCard';

type FavoritesProps = {
  listings: Listing[];
  currentUser?: User | null;
  favoriteIds: string[];
};

const Favorites: React.FC<FavoritesProps> = ({
  listings,
  currentUser,
  favoriteIds,
}) => {
  return (
    <Container>
      <Heading
        title='Favorites'
        subtitle='List of places you have favorited!'
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing) => (
          <ListingCard
            listing={listing}
            currentUser={currentUser}
            key={listing.id}
            favoritedIds={favoriteIds}
          />
        ))}
      </div>
    </Container>
  );
};

export default Favorites;
