import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';

import { AntdRegistry } from '@ant-design/nextjs-registry';

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
    <html lang="en">
      <body className={IBMPlexSans.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
