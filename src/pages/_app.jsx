import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import AppLayout from '../layouts/AppLayout/AppLayout';
import GlobalStyle from 'styles/GlobalStyle';
import Color from 'styles/Color';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
export default function MyApp({ Component, pageProps }) {
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
      <RecoilRoot>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </RecoilRoot>
      <Toaster />
    </>
  );
}
