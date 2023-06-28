'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Heading from '@/src/components/Heading';
import Input from '@/src/components/Inputs/Input';

type RentModelDescriptionBodyProps = {
  isLoading: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

const RentModelDescriptionBody: React.FC<RentModelDescriptionBodyProps> = ({
  errors,
  isLoading,
  register,
}) => {
  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title='How would you discribe your place?'
        subtitle='Short and sweet works best!'
      />
      <Input
        id='title'
        label='Title'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr />
      <Input
        id='description'
        label='Description'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
};

export default RentModelDescriptionBody;
