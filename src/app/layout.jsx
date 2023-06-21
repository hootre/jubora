import AppLayout from 'components/AppLayout/AppLayout';
import Providers from 'utils/provider';
import './globals.css';
import './globals.scss';
export default async function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body>
        {/* <GlobalStyle /> */}
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
