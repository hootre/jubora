import Providers from 'utils/provider';
import GoogleAnalytics from './GoogleAnalytics';

export const metadata = {
  title: 'JUBORA',
  description: 'JUBORA 홈페이지 입니다',
  generator: 'JUBORA',
  applicationName: 'JUBORA',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
  colorScheme: 'light',
  creator: 'Jiachi Liu',
  publisher: 'Sebastian Markbåge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
