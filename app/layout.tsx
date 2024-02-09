import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';

import StyleProviderLayout from '@/components/StyleProviderLayout/StyleProviderLayout';

import './globals.css';

const IBMPlexSans = IBM_Plex_Sans({ weight: ['500', '600', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Currency exchange',
  description: 'Currency exchange app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body suppressHydrationWarning={true} className={IBMPlexSans.className}>
        <StyleProviderLayout>{children}</StyleProviderLayout>
      </body>
    </html>
  );
}
