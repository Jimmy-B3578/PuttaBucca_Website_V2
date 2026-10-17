import '../style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Calculator from '../components/Calculator';
import MobileActionBar from '../components/MobileActionBar';
import { Analytics } from "@vercel/analytics/next";
import { getProducts } from '../lib/products';

export default async function SiteLayout({ children }) {
  const products = await getProducts();
  // The calculator only needs enough to list materials and estimate tonnes
  const calculatorProducts = products.map(({ slug, name, unit, density }) => ({ slug, name, unit, density }));

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <Calculator products={calculatorProducts} />
      <MobileActionBar />
      <Analytics />
    </>
  );
}
