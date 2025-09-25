'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { products } from '../config/products.config';

const STORAGE_KEY = 'pb_sale_popup_session_dismissed_v1';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export default function SalePopup() {
  const [visible, setVisible] = useState(false);

  const redwoodProduct = useMemo(() => {
    return products.find(p => /red\s*wood/i.test(p.name)) || null;
  }, []);

  const fallbackMulch = useMemo(() => products.find(p => p.category === 'Mulch') || null, []);
  const productToShow = redwoodProduct || fallbackMulch;

  const targetHref = productToShow
    ? `/products/${slugify(productToShow.name)}`
    : '/products?category=Mulch';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissed = window.sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    try { if (typeof window !== 'undefined') window.sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="sale-popup-overlay" role="dialog" aria-modal="true" aria-labelledby="sale-popup-title">
      <div className="sale-popup" role="document">
        <button className="sale-popup-close" onClick={close} aria-label="Close promotion">×</button>
        <div className="sale-popup-content">
          <span className="sale-badge">Limited Time</span>
          <div className="sale-card card">
            {productToShow?.image && (
              <img src={productToShow.image} alt={productToShow.name} className="sale-card-image" />
            )}
            <div className="card-content">
              {productToShow?.category && (
                <span className="product-category">{productToShow.category}</span>
              )}
              <h2>{redwoodProduct ? 'Redwood Chip' : productToShow?.name || 'Mulch'}</h2>
              {productToShow?.description && (
                <p>{productToShow.description.length > 140 ? productToShow.description.slice(0, 137) + '…' : productToShow.description}</p>
              )}
              <Link href={targetHref} className="cta-button" onClick={close}>View Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


