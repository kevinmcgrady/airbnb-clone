import { getAuthSession } from '@/app/actions/getCurrentUser';
import getFavoritedIds from '@/app/actions/getFavoritedIds';
import getListingbyId from '@/app/actions/getListingById';
import getReservations from '@/app/actions/getReservations';
import EmptyState from '@/app/components/EmptyState';
import Listing from '@/app/components/Listing';

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
