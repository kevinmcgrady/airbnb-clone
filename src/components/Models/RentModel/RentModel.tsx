'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Model from '@/src/components/Models/Model';
import { categories } from '@/src/constants/categories';
import useRentModel from '@/src/hooks/useRentModel';
import {
  CreateListingRequest,
  CreateListingValidator,
} from '@/src/validators/CreateListing';

import RentModelCategoryBody from './RentModelCategoryBody';
import RentModelDescriptionBody from './RentModelDescriptionBody';
import RentModelImageBody from './RentModelImageBody';
import RentModelInfoBody from './RentModelInfoBody';
import RentModelLocationBody from './RentModelLocationBody';
import RentModelPriceBody from './RentModelPriceBody';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModel = () => {
  const rentModel = useRentModel();
  const router = useRouter();
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const { mutate: createListing, isLoading } = useMutation({
    mutationFn: async (payload: CreateListingRequest) => {
      const data = await axios.post('/api/listing', payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          toast.error('You must be logged in.');
        }

        if (error.status === 400) {
          toast.error('Form invalid, please complete form.');
        }
      }

      toast.error('Something went wrong.');
    },
    onSuccess: () => {
      toast.success('Listing created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateListingRequest>({
    resolver: zodResolver(CreateListingValidator),
    defaultValues: {
      category: '',
      location: undefined,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: '10',
      title: '',
      description: '',
    },
  });

  const setCustomValue = (id: keyof CreateListingRequest, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const actionLabel = useMemo(() => {
    return step === STEPS.PRICE ? 'Create' : 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.CATEGORY ? undefined : 'BACK';
  }, [step]);

  const onSubmit =
    step !== STEPS.PRICE ? onNext : handleSubmit((e) => createListing(e));

  const secondaryAction = step === STEPS.CATEGORY ? undefined : onBack;

  const bodyContent: Record<STEPS, React.ReactElement> = {
    [STEPS.CATEGORY]: (
      <RentModelCategoryBody
        categories={categories}
        category={watch('category')}
        onSelect={setCustomValue}
      />
    ),
    [STEPS.DESCRIPTION]: (
      <RentModelDescriptionBody
        register={register}
        errors={errors}
        isLoading={isLoading}
      />
    ),
    [STEPS.IMAGES]: (
      <RentModelImageBody
        onSelect={setCustomValue}
        imageSrc={watch('imageSrc')}
      />
    ),
    [STEPS.INFO]: (
      <RentModelInfoBody
        bathroomCount={watch('bathroomCount')}
        guestCount={watch('guestCount')}
        onSelect={setCustomValue}
        roomCount={watch('roomCount')}
      />
    ),
    [STEPS.LOCATION]: (
      <RentModelLocationBody
        location={watch('location')}
        onSelect={setCustomValue}
      />
    ),
    [STEPS.PRICE]: (
      <RentModelPriceBody
        errors={errors}
        isLoading={isLoading}
        register={register}
      />
    ),
  };

  return (
    <Model
      title='Airbnb your home!'
      isOpen={rentModel.isOpen}
      onClose={rentModel.onClose}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={secondaryAction}
      body={bodyContent[step]}
    />
  );
};

export default RentModel;
