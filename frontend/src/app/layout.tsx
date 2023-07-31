import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '内定Journey',
  description: '内定までの道を管理するサイト！企業の選考状況など管理しましょう！',
  themeColor: '#ffffff',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
