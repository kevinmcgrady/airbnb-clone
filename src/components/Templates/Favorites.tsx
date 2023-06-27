'use client';

import { Listing, User } from '@prisma/client';

import Container from '@/src/components/Container';
import Heading from '@/src/components/Heading';
import ListingCard from '@/src/components/Listings/ListingCard';

type FavoritesProps = {
  listings: Listing[];
  currentUser?: User | null;
};

const Favorites: React.FC<FavoritesProps> = ({ listings, currentUser }) => {
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
          />
        ))}
      </div>
    </Container>
  );
};

export default Favorites;
