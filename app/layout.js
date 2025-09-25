import './style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Calculator from './components/Calculator';
import { Analytics } from "@vercel/analytics/next";
import SalePopup from './components/SalePopup';

export const metadata = {
  title: 'Putta-Bucca Landscape Supplies',
  description: 'Your local supplier for garden, building, and landscape materials in Mudgee.',
  icons: {
    icon: [{ url: '/images/favicon.png', type: 'image/png' }],
    shortcut: ['/images/favicon.png'],
    apple: ['/images/favicon.png']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Calculator />
        <SalePopup />
        <Analytics />
      </body>
    </html>
  );
} 