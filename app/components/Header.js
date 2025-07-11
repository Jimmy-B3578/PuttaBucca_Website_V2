import Link from 'next/link';

const Header = () => {
  return (
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
  );
};

export default Header; 