'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Heading from '@/src/components/Heading';
import Input from '@/src/components/Inputs/Input';

type RegisterModelBodyProps = {
  errors: FieldErrors;
  isLoading: boolean;
  register: UseFormRegister<any>;
};

const RegisterModelBody: React.FC<RegisterModelBodyProps> = ({
  errors,
  isLoading,
  register,
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb' subtitle='Create and account!' />
      <Input
        id='email'
        errors={errors}
        label='Email'
        type='email'
        register={register}
        disabled={isLoading}
        required
      />
      <Input
        id='name'
        errors={errors}
        label='Name'
        type='text'
        register={register}
        disabled={isLoading}
        required
      />
      <Input
        id='password'
        errors={errors}
        label='Password'
        type='password'
        register={register}
        disabled={isLoading}
        required
      />
    </div>
  );
};

export default RegisterModelBody;
