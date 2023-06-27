import { getAuthSession } from '@/src/actions/getCurrentUser';
import getFavoritedIds from '@/src/actions/getFavoritedIds';
import getListings from '@/src/actions/getListings';
import EmptyState from '@/src/components/EmptyState';
import Properties from '@/src/components/Templates/Properties';

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
