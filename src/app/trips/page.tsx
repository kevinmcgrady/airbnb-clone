import getCurrentUser from '@/src/actions/getCurrentUser';
import getFavoritedIds from '@/src/actions/getFavoritedIds';
import getReservations from '@/src/actions/getReservations';
import EmptyState from '@/src/components/EmptyState';
import Trips from '@/src/components/Templates/Trips';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title='Not Authorized' subtitle='Please log in.' />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='No trips found'
        subtitle='Looks like you hav not reserved any trips.'
      />
    );
  }

  return <Trips reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
