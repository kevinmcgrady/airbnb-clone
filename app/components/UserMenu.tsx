'use client';

import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { Fragment, useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import Avatar from '@/app/components/Avatar';
import MenuItem from '@/app/components/MenuItem';
import useLoginModel from '@/app/hooks/useLoginModel';
import useRegisterModel from '@/app/hooks/useRegisterModel';
import useRentModel from '@/app/hooks/useRentModel';

type UserMenuProps = {
  currentUser: Session | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();
  const rentModel = useRentModel();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    rentModel.onOpen();
  }, [currentUser, loginModel, rentModel]);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onRent}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.user?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser?.user ? (
              <Fragment>
                <MenuItem
                  onClick={() => router.push('/trips')}
                  label='My trips'
                />
                <MenuItem
                  onClick={() => router.push('/favorites')}
                  label='My favorites'
                />
                <MenuItem onClick={() => {}} label='My Properties' />
                <MenuItem
                  onClick={() => router.push('/reservations')}
                  label='My reservations'
                />
                <MenuItem onClick={rentModel.onOpen} label='Airbnb your home' />
                <hr />
                <MenuItem onClick={() => signOut()} label='Log out' />
              </Fragment>
            ) : (
              <Fragment>
                <MenuItem onClick={loginModel.onOpen} label='Login' />
                <MenuItem onClick={registerModel.onOpen} label='Sign up' />
              </Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
