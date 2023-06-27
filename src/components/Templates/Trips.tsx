'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User } from 'next-auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import Container from '@/src/components/Container';
import Heading from '@/src/components/Heading';
import ListingCard from '@/src/components/Listings/ListingCard';
import { ReservationWithListing } from '@/src/types/ReservarionWithListing';

type TripsProps = {
  reservations: ReservationWithListing[];
  currentUser?: User | null;
  favoriteIds: string[];
};

const Trips: React.FC<TripsProps> = ({
  reservations,
  currentUser,
  favoriteIds,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const { mutate: deleteReservation } = useMutation({
    mutationFn: async (id: string) => {
      setDeletingId(id);
      const { data } = await axios.delete(`/api/reservations/${id}`);
      return data;
    },
    onError: () => {
      toast.error('Something went wrong');
      setDeletingId('');
    },
    onSuccess: () => {
      toast.success('Reservation cancelled');
      setDeletingId('');
      router.refresh();
    },
  });

  return (
    <Container>
      <Heading
        title='Trips'
        subtitle={`Where you've been and where you're going`}
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            actionId={reservation.id}
            onAction={deleteReservation}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel reservation'
            currentUser={currentUser}
            reservation={reservation}
            favoritedIds={favoriteIds}
          />
        ))}
      </div>
    </Container>
  );
};

export default Trips;
