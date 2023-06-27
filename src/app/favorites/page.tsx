import getCurrentUser from '@/src/actions/getCurrentUser';
import getFavoritedIds from '@/src/actions/getFavoritedIds';
import EmptyState from '@/src/components/EmptyState';
import Favorites from '@/src/components/Templates/Favorites';

import getFavoritedListings from '../../actions/getFavoriteListings';

const FavoritesPage = async () => {
  const listings = await getFavoritedListings();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title='Not Authorized' subtitle='Please log in' />;
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No Favorites Found'
        subtitle='Looks like you have no favorite listings'
      />
    );
  }

  return <Favorites listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
