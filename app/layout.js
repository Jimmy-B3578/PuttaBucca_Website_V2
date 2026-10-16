import './style.css';
import { Archivo } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import Calculator from './components/Calculator';
import MobileActionBar from './components/MobileActionBar';
import { Analytics } from "@vercel/analytics/next";

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
});

export const metadata = {
  title: 'Putta-Bucca Landscape Supplies',
  description: 'Your local supplier for garden, building, and landscape materials in Mudgee.',
  icons: {
    icon: [{ url: '/images/favicon.png', type: 'image/png' }],
    shortcut: ['/images/favicon.png'],
    apple: ['/images/favicon.png']
  }
};

export const viewport = {
  themeColor: '#183A27',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Calculator />
        <MobileActionBar />
        <Analytics />
      </body>
    </html>
  );
}
