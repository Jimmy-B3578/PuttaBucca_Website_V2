'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
      // Open via hash (works across navigations)
      window.location.hash = '#calculator';
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
    <div>
      <Link href={'/products'} onClick={handleProductsClick} className="cta-button animate-fade-in-up">View Our Products</Link>
      <a href="#calculator" onClick={handleToggleCalculator} className="cta-button secondary animate-fade-in-up">Calculate Your Project</a>
    </div>
  );
}


