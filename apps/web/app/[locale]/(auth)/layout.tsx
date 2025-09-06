import '../styles.css';
import { DesignSystemProvider } from '@foodify/design-system';
import { cn } from '@foodify/design-system/lib/utils';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

type RootLayoutProperties = {
  readonly children: ReactNode;
  readonly params: Promise<{
    locale: string;
  }>;
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const RootLayout = async ({ children, params }: RootLayoutProperties) => {
  const { locale } = await params;

  return (
    <html
      lang="en"
      className={cn(inter.variable, 'scroll-smooth')}
      suppressHydrationWarning
    >
      <body className='bg-red-500'>
        <DesignSystemProvider>
          {children}
        </DesignSystemProvider>
      </body>
    </html>
  );
};

export default RootLayout;
