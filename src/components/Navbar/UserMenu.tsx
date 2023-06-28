'use client';

import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Fragment, useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import Avatar from '@/src/components/Avatar';
import MenuItem from '@/src/components/Navbar/MenuItem';
import useLoginModel from '@/src/hooks/useLoginModel';
import useRegisterModel from '@/src/hooks/useRegisterModel';
import useRentModel from '@/src/hooks/useRentModel';

type UserMenuProps = {
  currentUser: User | null;
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
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <Fragment>
                <MenuItem
                  onClick={() => router.push('/trips')}
                  label='My Trips'
                />
                <MenuItem
                  onClick={() => router.push('/favorites')}
                  label='My Favorites'
                />
                <MenuItem
                  onClick={() => router.push('/properties')}
                  label='My Properties'
                />
                <MenuItem
                  onClick={() => router.push('/reservations')}
                  label='My Reservations'
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
