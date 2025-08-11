import './style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Calculator from './components/Calculator';
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: 'Putta-Bucca Landscape Supplies',
  description: 'Your local supplier for garden, building, and landscape materials in Mudgee.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Calculator />
        <Analytics />
      </body>
    </html>
  );
} 