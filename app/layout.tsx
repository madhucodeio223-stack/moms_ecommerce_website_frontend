import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MamaNest | Supporting Every Step of Motherhood',
  description: 'From pregnancy to toddlerhood — products, guidance, subscriptions, and expert support in one place.',
  keywords: 'motherhood, pregnancy, baby care, toddler, maternity, parenting, baby products',
  openGraph: {
    title: 'MamaNest | Supporting Every Step of Motherhood',
    description: 'From pregnancy to toddlerhood — products, guidance, subscriptions, and expert support in one place.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MamaNest | Supporting Every Step of Motherhood',
    description: 'From pregnancy to toddlerhood — products, guidance, subscriptions, and expert support in one place.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
