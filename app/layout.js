import './style.css';
import Link from 'next/link';

export const metadata = {
  title: 'Putta Bucca Landscapes - Quality Landscape Supplies',
  description: 'Your Trusted Partner for Quality Landscape Supplies. From decorative stones to quality soils, we have everything you need for your next landscaping project.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <div className="logo">
              <Link href="/">Putta Bucca Landscapes</Link>
            </div>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <div className="container">
            <p>&copy; 2025 Putta Bucca Landscapes. All Rights Reserved.</p>
            <p className="footer-contact">19 Industrial Ave, Mudgee NSW 2850 | 0419 669 003 | sales@puttabucca.com.au | Mon - Fri: 7am - 5pm, Sat: 8am - 1pm</p>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 