import type { Metadata } from 'next';
import './globals.css';

import { Header } from '@/components/layout/header';

export const metadata: Metadata = {
  title: {
    default: '  Vrittech Shop Dashboard',
    template: '%s | Virttech Shop Dashboard'
  },
  description: 'A modern e-commerce dashboard built with Next.js, TypeScript, and Fake Store API.',
  metadataBase: new URL('https://vrittech-shop.vercel.app/')
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}
