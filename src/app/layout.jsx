import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Providers from './providers';

export const metadata = {
  title: 'TalentMap',
  description: 'A visual talent map for startup tech hiring in Japan.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
