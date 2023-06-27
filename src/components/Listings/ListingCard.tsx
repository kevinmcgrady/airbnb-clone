'use client';

import { Listing, Reservation } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User } from 'next-auth';
import { useCallback, useMemo } from 'react';

import Button from '@/src/components/Button';
import HeartButton from '@/src/components/HeartButton';
import useCountries from '@/src/hooks/useCountries';

type ListingCardProps = {
  listing: Listing;
  currentUser?: User | null;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  favoritedIds: string[];
};

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  currentUser,
  actionId = '',
  actionLabel,
  disabled,
  onAction,
  reservation,
  favoritedIds,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(listing.locationValue);
  const hasFavorited = favoritedIds.includes(listing.id);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [disabled, onAction, actionId],
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return listing.price;
  }, [reservation, listing.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      className='col-span-1 cursor-pointer group'
      onClick={() => router.push(`/listing/${listing.id}`)}
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='aspect-square w-full relative overflow-hidden rounded-xl'>
          <Image
            fill
            alt={listing.title}
            src={listing.imageSrc}
            className='object-cover h-full w-full group hover:scale-110 transition'
          />
          <div className='absolute top-3 right-3'>
            <HeartButton
              listingId={listing.id}
              currentUser={currentUser}
              hasFavorited={hasFavorited}
              isLoggedIn={!!currentUser}
            />
          </div>
        </div>
        <h2 className='font-semibold text-lg'>
          {location?.region}, {location?.label}
        </h2>
        <p className='font-light text-neutral-500'>
          {reservationDate || listing.category}
        </p>
        <div className='flex flex-row items-center gap-1'>
          <p className='font-semibold'>£{price}</p>
          {!reservation && <p className='font-light'>per night</p>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
