'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Heading from '@/src/components/Heading';
import Input from '@/src/components/Inputs/Input';

type LoginModelBodyProps = {
  errors: FieldErrors;
  isLoading: boolean;
  register: UseFormRegister<any>;
};

const LoginModelBody: React.FC<LoginModelBodyProps> = ({
  errors,
  isLoading,
  register,
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome Back' subtitle='Log in to your account' />
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

export default LoginModelBody;
