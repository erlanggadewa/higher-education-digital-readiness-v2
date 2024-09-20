import ProviderComponent from '@/components/layouts/provider-component';
import '@/styles/tailwind.css';
import { TRPCReactProvider } from '@/trpc/react';
import { Nunito } from 'next/font/google';
import 'react-perfect-scrollbar/dist/css/styles.css';

export const metadata = {
  title: 'HEDR | Higher Education Digital Readiness',
  description: 'Higher Education Digital Readiness',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};
const nunito = Nunito({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable} suppressHydrationWarning>
      <body>
        <ProviderComponent>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ProviderComponent>
      </body>
    </html>
  );
}
