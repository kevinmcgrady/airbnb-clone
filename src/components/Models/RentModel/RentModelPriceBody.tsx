'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Heading from '@/src/components/Heading';
import Input from '@/src/components/Inputs/Input';

type RentModelPriceBodyProps = {
  register: UseFormRegister<any>;
  isLoading: boolean;
  errors: FieldErrors;
};

const RentModelPriceBody: React.FC<RentModelPriceBodyProps> = ({
  errors,
  isLoading,
  register,
}) => {
  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Now, set your price'
        subtitle='How much will you charge per night?'
      />
      <Input
        id='price'
        label='Price'
        formatPrice
        register={register}
        type='number'
        disabled={isLoading}
        errors={errors}
      />
    </div>
  );
};

export default RentModelPriceBody;
