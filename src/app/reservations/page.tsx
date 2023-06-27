import { getAuthSession } from '@/src/actions/getCurrentUser';

import getFavoritedIds from '../../actions/getFavoritedIds';
import getReservations from '../../actions/getReservations';
import EmptyState from '../../components/EmptyState';
import Reservations from '../../components/Templates/Reservations';

const ReservationsPage = async () => {
  const currentUser = await getAuthSession();

  if (!currentUser?.user) {
    return <EmptyState title='Not Authorized' subtitle='Please login' />;
  }

  const reservations = await getReservations({ authorId: currentUser.user.id });
  const favoritedIds = await getFavoritedIds();

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='No Reservations Found'
        subtitle='Looks like you do not have any reservations for your properties, yet!'
      />
    );
  }

  return (
    <Reservations
      reservations={reservations}
      currentUser={currentUser.user}
      favoriteIds={favoritedIds}
    />
  );
};

export default ReservationsPage;
