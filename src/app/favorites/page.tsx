import { getAuthSession } from '@/src/actions/getCurrentUser';

import getFavoritedIds from '../../actions/getFavoritedIds';
import getFavoritedListings from '../../actions/getFavoriteListings';
import EmptyState from '../../components/EmptyState';
import Favorites from '../../components/Templates/Favorites';

const FavoritesPage = async () => {
  const listings = await getFavoritedListings();
  const favoriteIds = await getFavoritedIds();
  const currentUser = await getAuthSession();

  if (!currentUser?.user) {
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

  return (
    <Favorites
      listings={listings}
      currentUser={currentUser.user}
      favoriteIds={favoriteIds}
    />
  );
};

export default FavoritesPage;
