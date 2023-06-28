'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

import useCountries from '@/src/hooks/useCountries';
import useSearchModel from '@/src/hooks/useSearchModel';
import { formatDuration } from '@/src/utils/formatDuration';

const Search = () => {
  const searchModel = useSearchModel();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    return locationValue ? getByValue(locationValue)?.label : 'Anywhere';
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    return startDate && endDate
      ? `${formatDuration(endDate, startDate) + 1} days`
      : 'Any Week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    return guestCount ? `${guestCount} Guests` : 'Add Guests';
  }, [guestCount]);

  return (
    <div
      onClick={searchModel.onOpen}
      className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='text-sm font-semibold px-6'>{locationLabel}</div>
        <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
          {durationLabel}
        </div>
        <div className='text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3'>
          <div className='hidden sm:block'>{guestLabel}</div>
          <div className='p-2 bg-rose-500 rounded-full text-white'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
