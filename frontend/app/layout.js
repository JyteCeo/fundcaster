import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { EB_Garamond, Work_Sans, JetBrains_Mono } from 'next/font/google';
import { config } from '../config';
import { Providers } from './providers';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: "FundArc",
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
      <body className={`${ebGaramond.variable} ${workSans.variable} ${jetBrainsMono.variable}`}>
        <Providers initialState={initialState}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
