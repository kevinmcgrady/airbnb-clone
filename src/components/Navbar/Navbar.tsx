'use client';

import { Session } from 'next-auth';

import Container from '@/src/components/Container';
import Categories from '@/src/components/Navbar/Categories';
import Logo from '@/src/components/Navbar/Logo';
import Search from '@/src/components/Navbar/Search';
import UserMenu from '@/src/components/Navbar/UserMenu';

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
      <Categories />
    </div>
  );
};

export default Navbar;
