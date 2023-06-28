'use client';

import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';

import Model from '@/src/components/Models/Model';
import useSearchModel from '@/src/hooks/useSearchModel';
import { CountrySelectType } from '@/src/types/CountrySelect';

import SearchModelDateBody from './SearchModelDateBody';
import SearchModelInfoBody from './SearchModelInfoBody';
import SearchModelLocationBody from './SearchModelLocationBody';

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
    return step === STEPS.INFO ? 'Search' : 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.LOCATION ? undefined : 'Back';
  }, [step]);

  const secondaryAction = () => {
    return step === STEPS.LOCATION ? undefined : onBack;
  };

  const bodyContent: Record<STEPS, React.ReactElement> = {
    [STEPS.LOCATION]: (
      <SearchModelLocationBody location={location} onChange={setLocation} />
    ),
    [STEPS.DATE]: (
      <SearchModelDateBody dateRange={dateRange} onSelect={setDateRange} />
    ),
    [STEPS.INFO]: (
      <SearchModelInfoBody
        onBathroomSelect={setBathroomCount}
        onGuestCountSelect={setGuestCount}
        onRoomCountSelect={setRoomCount}
        bathroomCount={bathroomCount}
        guestCount={guestCount}
        roomCount={roomCount}
      />
    ),
  };

  return (
    <Model
      isOpen={searchModel.isOpen}
      onClose={searchModel.onClose}
      onSubmit={onSubmit}
      title='Filters'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent[step]}
      secondaryAction={secondaryAction}
    />
  );
};

export default SearchModel;
