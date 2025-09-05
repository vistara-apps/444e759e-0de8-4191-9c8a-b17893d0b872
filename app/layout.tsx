import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shipit - Decentralized Package Delivery',
  description: 'Deliver anything, faster and cheaper. Earn by delivering.',
  keywords: ['delivery', 'blockchain', 'base', 'decentralized', 'courier'],
  authors: [{ name: 'Shipit Team' }],
  openGraph: {
    title: 'Shipit - Decentralized Package Delivery',
    description: 'Deliver anything, faster and cheaper. Earn by delivering.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
