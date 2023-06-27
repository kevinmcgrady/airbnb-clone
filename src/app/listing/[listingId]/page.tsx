import getCurrentUser from '@/src/actions/getCurrentUser';
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
  const currentUser = await getCurrentUser();
  const reservarions = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <Listing
      listing={listing}
      currentUser={currentUser}
      reservations={reservarions}
    />
  );
};

export default ListingPage;
