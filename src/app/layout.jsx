'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from 'components/AppLayout/AppLayout';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import GlobalStyle from 'styles/GlobalStyle';

export default async function RootLayout({ children }) {
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
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <AppLayout>{children}</AppLayout>
          </RecoilRoot>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
