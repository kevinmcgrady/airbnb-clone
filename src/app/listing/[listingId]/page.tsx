import { getAuthSession } from '@/src/actions/getCurrentUser';
import getFavoritedIds from '@/src/actions/getFavoritedIds';
import getListingbyId from '@/src/actions/getListingById';
import getReservations from '@/src/actions/getReservations';
import EmptyState from '@/src/components/EmptyState';
import Listing from '@/src/components/Templates/Listing';

type ListingPageProps = {
  params: {
    listingId: string;
  };
};

const ListingPage = async ({ params }: ListingPageProps) => {
  const listing = await getListingbyId(params.listingId);
  const currentUser = await getAuthSession();
  const favoriteIds = await getFavoritedIds();
  const reservarions = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }

  const hasFavorited = favoriteIds.includes(listing.id);

  return (
    <Listing
      listing={listing}
      currentUser={currentUser?.user}
      hasFavorited={hasFavorited}
      reservations={reservarions}
    />
  );
};

export default ListingPage;
