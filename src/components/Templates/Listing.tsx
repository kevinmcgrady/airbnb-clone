'use client';

import { Listing, Reservation, User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';

import Container from '@/src/components/Container';
import ListingHead from '@/src/components/Listings/ListingHead';
import ListingInfo from '@/src/components/Listings/ListingInfo';
import ListingReservation from '@/src/components/Listings/ListingReservation';
import { categories } from '@/src/constants/categories';
import useLoginModel from '@/src/hooks/useLoginModel';
import { formatDisableDates } from '@/src/utils/formatDisableDates';
import { formatDuration } from '@/src/utils/formatDuration';
import { CreateReservationRequest } from '@/src/validators/CreateReservation';

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

type ListingProps = {
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
  reservations?: Reservation[];
  hasFavorited?: boolean;
};

const Listing: React.FC<ListingProps> = ({
  listing,
  currentUser,
  hasFavorited,
  reservations = [],
}) => {
  const loginModel = useLoginModel();
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState<number>(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const { mutate: createReservation, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateReservationRequest = {
        totalPrice,
        startDate: dateRange.startDate!,
        endDate: dateRange.endDate!,
        listingId: listing.id,
      };

      const data = await axios.post('/api/reservations', payload);
      return data;
    },
    onError: () => {
      toast.error('Something went wrong');
    },
    onSuccess: () => {
      toast.success('Listing reserved!');
      setDateRange(initialDateRange);
      router.refresh();
    },
  });

  const disableDates = useMemo(
    () => formatDisableDates(reservations),
    [reservations],
  );

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dateCount =
        formatDuration(dateRange.startDate, dateRange.endDate) + 1;
      dateRange && listing.price
        ? setTotalPrice(dateCount * listing.price)
        : setTotalPrice(listing.price);
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
            hasFavorited={hasFavorited}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={currentUser ? createReservation : loginModel.onOpen}
                disabled={isLoading}
                disableDates={disableDates}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
