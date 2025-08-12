"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const setHeaderVar = () => {
      const height = (headerRef.current?.offsetHeight ?? 50) + 'px';
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--header-height', height);
      }
    };
    setHeaderVar();
    const onResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
      setHeaderVar();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header ref={headerRef}>
      <nav>
        <div className="logo">
          <Link href="/" prefetch={false} onClick={closeMenu}>
            <img className="logo-icon" src="/images/favicon.png" alt="" aria-hidden="true" />
            Putta Bucca Landscapes
          </Link>
        </div>

        <button
          className="mobile-menu-toggle"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen(v => !v)}
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <div className="nav-right desktop-nav">
          <ul>
            <li><Link href="/" prefetch={false}>Home</Link></li>
            <li><Link href="/products" prefetch={false}>Products</Link></li>
            <li><Link href="/services" prefetch={false}>Services</Link></li>
            <li><Link href="/contact" prefetch={false}>Contact</Link></li>
          </ul>
          <a className="header-phone" href="tel:0419669003" aria-label="Call Putta Bucca Landscapes on 0419 669 003">0419 669 003</a>
        </div>
      </nav>

      {isMenuOpen && (
        <div id="mobile-menu" className="mobile-menu">
          <ul>
            <li><Link href="/" onClick={closeMenu} prefetch={false}>Home</Link></li>
            <li><Link href="/products" onClick={closeMenu} prefetch={false}>Products</Link></li>
            <li><Link href="/services" onClick={closeMenu} prefetch={false}>Services</Link></li>
            <li><Link href="/contact" onClick={closeMenu} prefetch={false}>Contact</Link></li>
          </ul>
          <a className="header-phone" href="tel:0419669003" onClick={closeMenu} aria-label="Call Putta Bucca Landscapes on 0419 669 003">0419 669 003</a>
        </div>
      )}
    </header>
  );
};

export default Header;