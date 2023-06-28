'use client';

import { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import Container from '@/src/components/Container';
import Heading from '@/src/components/Heading';
import ListingCard from '@/src/components/Listings/ListingCard';
import { ReservationWithListing } from '@/src/types/ReservarionWithListing';

type ReservationsProps = {
  reservations: ReservationWithListing[];
  currentUser?: User | null;
};

const Reservations: React.FC<ReservationsProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>();

  const { mutate: deleteReservation, isLoading } = useMutation({
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
      <Heading title='Reservations' subtitle='Bookings on your properties' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            actionId={reservation.id}
            onAction={deleteReservation}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel guest reservation'
            currentUser={currentUser}
            reservation={reservation}
            isLoading={isLoading && deletingId === reservation.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default Reservations;
