'use client';

import { Listing } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User } from 'next-auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import Container from './Container';
import Heading from './Heading';
import ListingCard from './ListingCard';

type PropertiesProps = {
  listings: Listing[];
  currentUser?: User | null;
  favoriteIds: string[];
};

const Properties: React.FC<PropertiesProps> = ({
  listings,
  currentUser,
  favoriteIds,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const { mutate: deleteListing } = useMutation({
    mutationFn: async (id: string) => {
      setDeletingId(id);
      const { data } = await axios.delete(`/api/listing/${id}`);
      return data;
    },
    onError: () => {
      toast.error('Something went wrong');
      setDeletingId('');
    },
    onSuccess: () => {
      toast.success('Property removed');
      setDeletingId('');
      router.refresh();
    },
  });

  return (
    <Container>
      <Heading title='Properties' subtitle='List of your properties' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((property) => (
          <ListingCard
            key={property.id}
            listing={property}
            actionId={property.id}
            onAction={deleteListing}
            disabled={deletingId === property.id}
            actionLabel='Delete property'
            currentUser={currentUser}
            favoritedIds={favoriteIds}
          />
        ))}
      </div>
    </Container>
  );
};

export default Properties;
