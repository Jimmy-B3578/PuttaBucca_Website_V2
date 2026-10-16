'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { siteConfig } from '../config/site.config';
import { CalculatorIcon, PhoneIcon } from './Icons';

export default function HeroButtons() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const sync = () => setIsCalculatorOpen(typeof window !== 'undefined' && window.location.hash === '#calculator');
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const handleToggleCalculator = (e) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;
    const isOpen = window.location.hash === '#calculator' || document.getElementById('universal-calculator-sidebar')?.classList.contains('open');
    if (isOpen) {
      // Close explicitly via custom event; leave hash as-is
      window.dispatchEvent(new Event('calculator:close'));
    } else {
      // Open via event so it works even when the hash is already #calculator
      window.dispatchEvent(new Event('calculator:open'));
    }
  };

  const handleProductsClick = (e) => {
    if (isCalculatorOpen) {
      // Preserve open calculator without hash; avoid full reload
      e.preventDefault();
      router.push('/products');
    }
  };

  return (
    <div className="hero-actions">
      <a href={siteConfig.phoneHref} className="btn btn-primary btn-lg" aria-label={`Call Putta Bucca Landscapes on ${siteConfig.phone}`}>
        <PhoneIcon />
        <span>Call {siteConfig.phone}</span>
      </a>
      <Link href={'/products'} onClick={handleProductsClick} className="btn btn-light btn-lg">View Our Products</Link>
      <a href="#calculator" onClick={handleToggleCalculator} className="hero-calc-link">
        <CalculatorIcon />
        <span>Calculate Your Project</span>
      </a>
    </div>
  );
}
