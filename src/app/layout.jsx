import AppLayout from 'components/AppLayout/AppLayout';
import StyledComponentsRegistry from 'utils/registry';
import supabase_server from 'lib/supabase-server';
import GlobalStyle from 'styles/GlobalStyle';
import Providers from 'utils/provider';

export default async function RootLayout({ children }) {
  const {
    data: { session },
  } = await supabase_server.auth.getSession();

  return (
    <html lang="kr">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <Providers>
            <AppLayout session={session}>{children}</AppLayout>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
