import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth';
import AuthProvider from '@/context/SessionProvider';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

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
      <body className={poppins.className}>
        <AuthProvider session={session}>
          <main className="max-w-[1440px] mx-auto h-screen bg-orange-100">
            <Navbar />
            {children}
            <Footer />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
