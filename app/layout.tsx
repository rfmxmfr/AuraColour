import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'AuraColor - Professional Color Analysis',
  description: 'Discover your optimal color palette with professional color analysis services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <div className="flex-grow pt-16">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}