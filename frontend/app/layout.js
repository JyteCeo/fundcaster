import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { config } from '../config';
import { Providers } from './providers';
import "./globals.css";

export const metadata = {
  title: "FundCaster",
  description: "A decentralized crowdfunding platform",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(
    config,
    headers().get('cookie')
  );

  return (
    <html lang="en">
      <body>
        <Providers initialState={initialState}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
