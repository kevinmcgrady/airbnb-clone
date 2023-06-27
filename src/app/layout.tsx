import '../globals.css';

import { Nunito } from 'next/font/google';

import { getAuthSession } from '@/src/actions/getCurrentUser';
import Navbar from '@/src/components/Navbar/Navbar';

import LoginModel from '../components/Models/LoginModel';
import RegisterModel from '../components/Models/RegisterModel';
import RentModel from '../components/Models/RentModel';
import SearchModel from '../components/Models/SearchModel';
import { ReactQueryProvider } from '../providers/ReactQuery';
import ToasterProvider from '../providers/ToasterProvider';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
};

const font = Nunito({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getAuthSession();

  return (
    <html lang='en'>
      <body className={font.className}>
        <ReactQueryProvider>
          <ToasterProvider />
          <RegisterModel />
          <LoginModel />
          <RentModel />
          <SearchModel />
          <Navbar currentUser={currentUser} />
          <div className='pb-20 pt-28'>{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
