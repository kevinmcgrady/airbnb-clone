import getCurrentUser from '@/src/actions/getCurrentUser';
import getListings from '@/src/actions/getListings';
import EmptyState from '@/src/components/EmptyState';
import Properties from '@/src/components/Templates/Properties';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title='Not Authorized' subtitle='Please log in.' />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No properties found'
        subtitle='Looks like you have no properties.'
      />
    );
  }

  return <Properties listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
