import { cn } from '@foodify/design-system/lib/utils';
import { DesignSystemProvider } from '@foodify/design-system';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

// STYLES
import './styles.css';

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
      <body>
        <DesignSystemProvider>
          {children}
        </DesignSystemProvider>
      </body>
    </html>
  );
};

export default RootLayout;
