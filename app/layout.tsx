import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth';
import AuthProvider from '@/context/SessionProvider';
import Navbar from '@/components/shared/Navbar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Welcome to Personal Chatbot',
  description: 'Make your personal chatbot easy',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <AuthProvider session={session}>
        <body className={poppins.className}>
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
