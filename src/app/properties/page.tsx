import { getAuthSession } from '../../actions/getCurrentUser';
import getFavoritedIds from '../../actions/getFavoritedIds';
import getListings from '../../actions/getListings';
import EmptyState from '../../components/EmptyState';
import Properties from '../../components/Templates/Properties';

const PropertiesPage = async () => {
  const currentUser = await getAuthSession();

  if (!currentUser?.user) {
    return <EmptyState title='Not Authorized' subtitle='Please log in.' />;
  }

  const listings = await getListings({ userId: currentUser.user.id });
  const favoriteIds = await getFavoritedIds();

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No properties found'
        subtitle='Looks like you have no properties.'
      />
    );
  }

  return (
    <Properties
      listings={listings}
      currentUser={currentUser.user}
      favoriteIds={favoriteIds}
    />
  );
};

export default PropertiesPage;
