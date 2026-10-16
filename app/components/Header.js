"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../config/site.config';
import CalculatorButton from './CalculatorButton';
import { ClockIcon, CloseIcon, MenuIcon, PhoneIcon, PinIcon } from './Icons';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const setHeaderVar = () => {
      const height = (headerRef.current?.offsetHeight ?? 64) + 'px';
      document.documentElement.style.setProperty('--header-height', height);
    };
    setHeaderVar();
    const onResize = () => {
      if (window.innerWidth > 960) setIsMenuOpen(false);
      setHeaderVar();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (href) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <header className="site-header" ref={headerRef}>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span className="utility-item">
            <ClockIcon size={16} />
            {siteConfig.hours.map((h) => `${h.days} ${h.time}`).join(' · ')}
          </span>
          <a className="utility-item" href={siteConfig.directionsUrl} target="_blank" rel="noopener noreferrer">
            <PinIcon size={16} />
            {siteConfig.address}
          </a>
        </div>
      </div>

      <nav className="main-nav" aria-label="Main">
        <div className="container nav-inner">
          <Link href="/" prefetch={false} className="brand" onClick={closeMenu}>
            <img className="brand-mark" src="/images/favicon.png" alt="" aria-hidden="true" width="40" height="40" />
            <span className="brand-name">Putta Bucca <span>Landscapes</span></span>
          </Link>

          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} prefetch={false} aria-current={isActive(l.href) ? 'page' : undefined}>{l.label}</Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <CalculatorButton className="btn btn-quiet nav-calc">Calculator</CalculatorButton>
            <a className="btn btn-primary nav-call" href={siteConfig.phoneHref} aria-label={`Call Putta Bucca Landscapes on ${siteConfig.phone}`}>
              <PhoneIcon />
              <span>{siteConfig.phone}</span>
            </a>
            <button
              type="button"
              className="menu-toggle"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="mobile-menu">
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} prefetch={false} onClick={closeMenu} aria-current={isActive(l.href) ? 'page' : undefined}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mobile-menu-info">
              <p><ClockIcon size={18} /> {siteConfig.hours.map((h) => `${h.days} ${h.time}`).join(' · ')}</p>
              <p><PinIcon size={18} /> {siteConfig.address}</p>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
