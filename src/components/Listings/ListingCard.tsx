'use client';

import { Listing, Reservation, User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import Button from '@/src/components/Button';
import HeartButton from '@/src/components/HeartButton';
import useCountries from '@/src/hooks/useCountries';
import { formatDate } from '@/src/utils/formatDate';

type ListingCardProps = {
  listing: Listing;
  currentUser?: User | null;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
};

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  currentUser,
  actionId = '',
  actionLabel,
  disabled,
  onAction,
  reservation,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);

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
    return reservation ? reservation.totalPrice : listing.price;
  }, [reservation, listing.price]);

  const reservationDate = useMemo(() => {
    return reservation
      ? formatDate(reservation.startDate, reservation.endDate)
      : null;
  }, [reservation]);

  return (
    <div className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col gap-2 w-full'>
        <div className='aspect-square w-full relative overflow-hidden rounded-xl'>
          <Image
            onClick={() => router.push(`/listing/${listing.id}`)}
            fill
            alt={listing.title}
            src={listing.imageSrc}
            className='object-cover h-full w-full group hover:scale-110 transition'
          />
          <div className='absolute top-3 right-3'>
            <HeartButton listingId={listing.id} currentUser={currentUser} />
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
