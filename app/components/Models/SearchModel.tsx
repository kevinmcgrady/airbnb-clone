'use client';

import { formatISO } from 'date-fns';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';

import Model from '@/app/components/Models/Model';
import useSearchModel from '@/app/hooks/useSearchModel';
import { CountrySelectType } from '@/app/types/CountrySelect';

import Calendar from '../Calendar';
import Counter from '../Counter';
import CountrySelect from '../CountrySelect';
import Heading from '../Heading';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModel = () => {
  const searchModel = useSearchModel();
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState<STEPS>(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectType>();
  const [guestCount, setGuestCount] = useState<number>(1);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(
    () => dynamic(() => import('@/app/components/Map'), { ssr: false }),
    [location],
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true },
    );

    setStep(STEPS.LOCATION);
    searchModel.onClose();
    router.push(url);
  }, [
    step,
    searchModel,
    location,
    router,
    guestCount,
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you wanna go?'
        subtitle='Find the perfect location'
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free'
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='More Information' subtitle='Find your perfect place' />
        <Counter
          title='Guests'
          subtitle='How many guests are coming?'
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you need?'
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you need?'
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Model
      isOpen={searchModel.isOpen}
      onClose={searchModel.onClose}
      onSubmit={onSubmit}
      title='Filters'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  );
};

export default SearchModel;
