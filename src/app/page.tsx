import getCurrentUser from '@/src/actions/getCurrentUser';
import getListings from '@/src/actions/getListings';
import Container from '@/src/components/Container';
import EmptyState from '@/src/components/EmptyState';
import ListingCard from '@/src/components/Listings/ListingCard';

type HomeProps = {
  searchParams: {
    userId?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
