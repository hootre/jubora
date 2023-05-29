import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import AppLayout from '../layouts/AppLayout/AppLayout';
import GlobalStyle from 'styles/GlobalStyle';
import Color from 'styles/Color';
import { RecoilRoot } from 'recoil';
import { AuthProvider } from 'components/Auth/AuthProvider';
import supabase from 'lib/supabase-browser';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });
  return (
    <>
      <GlobalStyle />
      <Color />

      <Head>
        <title>JUBORA</title>
        <meta name="MainPage" content="JUBORA 홈페이지 입니다" />
        <meta
          name="viewport"
          content="target-densitydpi=device-dpi, user-scalable=0, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width"
        />
      </Head>
      <AuthProvider supabase={supabase}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </RecoilRoot>
        </QueryClientProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
}
