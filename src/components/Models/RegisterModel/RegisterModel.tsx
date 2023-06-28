'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Model from '@/src/components/Models/Model';
import RegisterModelBody from '@/src/components/Models/RegisterModel/RegisterModelBody';
import RegisterModelFooter from '@/src/components/Models/RegisterModel/RegisterModelFooter';
import useRegisterModel from '@/src/hooks/useRegisterModel';
import {
  RegisterUserRequest,
  RegisterUserValidator,
} from '@/src/validators/registerUser';

const RegisterModel = () => {
  const registerModel = useRegisterModel();

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

  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: async ({ email, name, password }: RegisterUserRequest) => {
      const payload: RegisterUserRequest = { email, name, password };
      const data = await axios.post('/api/register', payload);
      return data;
    },
    onError: () => {
      toast.error('Something went wrong');
    },
    onSuccess: () => {
      registerModel.onClose();
    },
  });

  return (
    <Model
      disabled={isLoading}
      isOpen={registerModel.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModel.onClose}
      onSubmit={handleSubmit((e) => registerUser(e))}
      body={
        <RegisterModelBody
          errors={errors}
          isLoading={isLoading}
          register={register}
        />
      }
      footer={<RegisterModelFooter />}
      isLoading={isLoading}
    />
  );
};

export default RegisterModel;
