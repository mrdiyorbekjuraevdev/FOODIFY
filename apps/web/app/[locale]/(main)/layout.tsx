import { cn } from '@foodify/design-system/lib/utils';
import { Inter } from 'next/font/google';
import { Suspense, type ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '@foodify/design-system/components/sidebar';
import { Sidebar } from '@/components/sidebar/sidebar';
import { Providers } from '@/providers';
import { NextAuth } from '@foodify/auth';

// STYLES
import '../styles.css';

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
      <body className={`${inter.className}} antialiased`}>
        <Suspense>
          <Providers>
            <NextAuth fallbackPath={"/sign-in"}>
              <SidebarProvider>
                <Sidebar />
                <SidebarInset>
                  {children}
                </SidebarInset>
              </SidebarProvider>
            </NextAuth>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
