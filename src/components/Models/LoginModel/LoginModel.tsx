'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import LoginModelBody from '@/src/components/Models/LoginModel/LoginModelBody';
import LoginModelFooter from '@/src/components/Models/LoginModel/LoginModelFooter';
import Model from '@/src/components/Models/Model';
import useLoginModel from '@/src/hooks/useLoginModel';
import {
  LoginUserRequest,
  LoginUserValidator,
} from '@/src/validators/loginUser';

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

  return (
    <Model
      disabled={isLoading}
      isOpen={loginModel.isOpen}
      title='Log in'
      actionLabel='Continue'
      onClose={loginModel.onClose}
      onSubmit={handleSubmit((e) => loginUser(e))}
      body={
        <LoginModelBody
          errors={errors}
          isLoading={isLoading}
          register={register}
        />
      }
      footer={<LoginModelFooter />}
      isLoading={isLoading}
    />
  );
};

export default LoginModel;
