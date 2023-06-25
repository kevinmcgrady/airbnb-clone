'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

import Button from '@/app/components/Button';
import Heading from '@/app/components/Heading';
import Input from '@/app/components/Inputs/Input';
import useLoginModel from '@/app/hooks/useLoginModel';
import {
  LoginUserRequest,
  LoginUserValidator,
} from '@/app/validators/loginUser';

import Model from './Model';

const LoginModel = () => {
  const loginModel = useLoginModel();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserRequest>({
    resolver: zodResolver(LoginUserValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginUser, isLoading } = useMutation({
    mutationFn: async ({ email, password }: LoginUserRequest) => {
      const payload: LoginUserRequest = { email, password };

      return signIn('credentials', { redirect: false, ...payload });
    },
    onError: () => {
      toast.error('Something went wrong');
    },
    onSuccess: (callback) => {
      if (callback?.error) {
        toast.error(callback?.error);
        return;
      }

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModel.onClose();
        return;
      }
    },
  });

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Log in to your account' />
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

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
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
      isOpen={loginModel.isOpen}
      title='Log in'
      actionLabel='Continue'
      onClose={loginModel.onClose}
      onSubmit={handleSubmit((e) => loginUser(e))}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModel;
