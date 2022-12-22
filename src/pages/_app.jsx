import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'
import AppLayout from '../layouts/AppLayout'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Head>
        <title>JUBORA</title>
        <meta name="MainPage" content="JUBORA 홈페이지 입니다" />
        <meta
          name="viewport"
          content="target-densitydpi=device-dpi, user-scalable=0, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width"
        />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      <Toaster />
    </>
  )
}

export default MyApp
