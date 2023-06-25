import './globals.css';

import { Nunito } from 'next/font/google';

import Navbar from '@/app/components/Navbar';

import RegisterModel from './components/Models/RegisterModel';
import ToasterProvider from './providers/ToasterProvider';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
};

const font = Nunito({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModel />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
