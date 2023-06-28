import getCurrentUser from '@/src/actions/getCurrentUser';
import getReservations from '@/src/actions/getReservations';
import EmptyState from '@/src/components/EmptyState';
import Reservations from '@/src/components/Templates/Reservations';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title='Not Authorized' subtitle='Please login' />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='No Reservations Found'
        subtitle='Looks like you do not have any reservations for your properties, yet!'
      />
    );
  }

  return <Reservations reservations={reservations} currentUser={currentUser} />;
};

export default ReservationsPage;
