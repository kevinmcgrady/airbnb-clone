'use client';

import { Session } from 'next-auth';

import Container from '@/app/components/Container';
import Logo from '@/app/components/Logo';
import Search from '@/app/components/Search';
import UserMenu from '@/app/components/UserMenu';

type NavbarProps = {
  currentUser: Session | null;
};

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-grow items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
