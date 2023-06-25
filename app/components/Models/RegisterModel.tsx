'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import Button from '@/app/components/Button';
import Heading from '@/app/components/Heading';
import Input from '@/app/components/Inputs/Input';
import useRegisterModel from '@/app/hooks/useRegisterModel';

import Model from './Model';

const RegisterModel = () => {
  const registerModel = useRegisterModel();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/register', data);
      registerModel.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
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

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <p>Already have an account?</p>
          <p className='text-neutral-800 cursor-pointer hover:underline'>
            Login
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={registerModel.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModel;
