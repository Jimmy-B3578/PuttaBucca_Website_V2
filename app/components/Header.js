import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo">
          <Link href="/">Putta Bucca Landscapes</Link>
        </div>
        <div className="nav-right">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <a className="header-phone" href="tel:0419669003" aria-label="Call Putta Bucca Landscapes on 0419 669 003">0419 669 003</a>
        </div>
      </nav>
    </header>
  );
};

export default Header; 