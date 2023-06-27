'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

import Button from '@/src/components/Button';
import Heading from '@/src/components/Heading';
import Input from '@/src/components/Inputs/Input';
import Model from '@/src/components/Models/Model';
import useLoginModel from '@/src/hooks/useLoginModel';
import useRegisterModel from '@/src/hooks/useRegisterModel';
import {
  RegisterUserRequest,
  RegisterUserValidator,
} from '@/src/validators/registerUser';

const RegisterModel = () => {
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserRequest>({
    resolver: zodResolver(RegisterUserValidator),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const toggle = useCallback(() => {
    registerModel.onClose();
    loginModel.onOpen();
  }, [loginModel, registerModel]);

  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: async ({ email, name, password }: RegisterUserRequest) => {
      const payload: RegisterUserRequest = { email, name, password };
      const data = await axios.post('/api/register', payload);
      return data;
    },
    onError: (error) => {
      toast.error('Something went wrong');
    },
    onSuccess: () => {
      registerModel.onClose();
    },
  });

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
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <p>Already have an account?</p>
          <p
            role='link'
            onClick={toggle}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
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
      onSubmit={handleSubmit((e) => registerUser(e))}
      body={bodyContent}
      footer={footerContent}
      isLoading={isLoading}
    />
  );
};

export default RegisterModel;
