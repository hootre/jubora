'use client';
import AppLayout from 'components/AppLayout/AppLayout';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import GlobalStyle from 'styles/GlobalStyle';
import Providers from 'utils/provider';

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body>
        <GlobalStyle />
        <Toaster />
        <Providers>
          <RecoilRoot>
            <AppLayout>{children}</AppLayout>
          </RecoilRoot>
        </Providers>
      </body>
    </html>
  );
}
