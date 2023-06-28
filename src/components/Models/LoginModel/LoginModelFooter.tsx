'use client';

import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';

import Button from '@/src/components/Button';
import useLoginModel from '@/src/hooks/useLoginModel';
import useRegisterModel from '@/src/hooks/useRegisterModel';

const LoginModelFooter: React.FC = () => {
  const loginModel = useLoginModel();
  const registerModel = useRegisterModel();

  const toggle = useCallback(() => {
    loginModel.onClose();
    registerModel.onOpen();
  }, [loginModel, registerModel]);

  return (
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
          <p>First time using Airbnb?</p>
          <p
            role='link'
            onClick={toggle}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Create an account
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModelFooter;
