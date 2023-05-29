'use client';
import AppLayout from 'components/AppLayout/AppLayout';
import { AuthProvider } from 'components/Auth/AuthProvider';
import supabase from 'lib/supabase-browser';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import GlobalStyle from 'styles/GlobalStyle';

export default async function RootLayout({ children }) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });
  return (
    <html lang="kr">
      <body>
        <GlobalStyle />
        <Toaster />
        <AuthProvider accessToken={accessToken}>
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <AppLayout>{children}</AppLayout>
            </RecoilRoot>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
