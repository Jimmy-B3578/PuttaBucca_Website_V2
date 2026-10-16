'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '../config/products.config.js';
import CategoryFilter from '../components/CategoryFilter';
import { CheckIcon, ArrowRightIcon } from '../components/Icons';

// Helper function to generate slugs
const slugify = (text) => text.toString().toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/--+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');

// Short "sold by" wording for the spec strip on each card
const soldBy = (unit = '') => unit.replace('per ', 'Per ').replace('cubic meter', 'm³');

export default function ProductsPage() {
  const router = useRouter();
  // Initialize empty to match SSR markup; sync from URL on mount
  const [selectedCategory, setSelectedCategory] = useState('');

  // Initialize and update category from URL parameter
  useEffect(() => {
    // Sync category from URL without useSearchParams (avoids Suspense requirement)
    const syncFromUrl = () => {
      if (typeof window === 'undefined') return;
      const sp = new URLSearchParams(window.location.search);
      setSelectedCategory(sp.get('category') || '');
    };
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  // After a category tap, bring the start of the new list up under the sticky bar.
  // Without this the page keeps its old scroll position: you land partway down the
  // new list, or at the footer when the new list is short.
  const scrollToListPending = useRef(false);
  useLayoutEffect(() => {
    if (!scrollToListPending.current) return;
    scrollToListPending.current = false;
    // Measured from the page header (it never moves) rather than the sticky bar,
    // whose position is unreliable while the browser settles the shorter page.
    // The target is the point where the bar just reaches the nav and sticks.
    const header = document.querySelector('.page-header');
    if (!header) return;
    const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
    const target = Math.round(header.getBoundingClientRect().bottom + window.scrollY - navHeight);
    // Only move when the bar is stuck, i.e. the visitor has scrolled into the list.
    // Runs before paint and jumps instantly, so the old position never flashes.
    if (window.scrollY > target) {
      window.scrollTo({ top: target, behavior: 'instant' });
    }
  }, [selectedCategory]);

  // Handle category change
  const handleCategoryChange = (category) => {
    if (category === selectedCategory) return;
    scrollToListPending.current = true;
    setSelectedCategory(category);
    if (category) {
      router.push(`/products?category=${encodeURIComponent(category)}`, { scroll: false });
    } else {
      router.push('/products', { scroll: false });
    }
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Group filtered products by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const category = product.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  const navigateToProduct = (productName) => {
    const slug = slugify(productName);
    router.push(`/products/${slug}`);
  };

  const handleCardClick = (event, product) => {
    // Only activate on phones
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return;

    // Ignore clicks originating from interactive elements
    if (event.target && typeof event.target.closest === 'function') {
      const interactiveAncestor = event.target.closest('a, button');
      if (interactiveAncestor) return;
    }

    navigateToProduct(product.name);
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="header-plate">
            <h1>Our Products</h1>
          </div>
        </div>
      </section>

      <CategoryFilter
        products={products}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="container products-body">
        {Object.entries(groupedProducts).map(([category, productsInCategory]) => (
          <section key={category} className="product-category-group" aria-labelledby={`cat-${slugify(category)}`}>
            <h2 className="category-title" id={`cat-${slugify(category)}`}>
              {category}
              <span className="category-count">{productsInCategory.length}</span>
            </h2>
            <div className="product-grid">
              {productsInCategory.map((product) => {
                const size = product.specifications?.Size;
                const colour = product.specifications?.Color;
                return (
                  <article
                    key={product.id}
                    className={`product-card ${product.category === 'Bagged Products' ? 'bagged-product' : ''}`}
                    onClick={(e) => handleCardClick(e, product)}
                  >
                    <div className="product-card-image">
                      <Image src={product.image} alt={product.name} width={480} height={360} sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 380px" />
                    </div>
                    <div className="product-card-body">
                      <h2>{product.name}</h2>
                      <ul className="spec-strip" aria-label="Key details">
                        {size && <li>{size}</li>}
                        {colour && <li className="spec-colour">{colour}</li>}
                        <li>{soldBy(product.unit)}</li>
                      </ul>
                      <p className="product-card-desc">{product.description}</p>
                      {product.featuresAndApplications && product.featuresAndApplications.length > 0 && (
                        <ul className="product-features">
                          {product.featuresAndApplications.slice(0, 2).map((item, index) => (
                            <li key={index}>
                              <CheckIcon size={16} />
                              {item}
                            </li>
                          ))}
                          {product.featuresAndApplications.length > 2 && (
                            <li className="more-features">
                              more features &amp; applications on details page
                            </li>
                          )}
                        </ul>
                      )}
                      <Link href={`/products/${slugify(product.name)}`} className="btn btn-outline product-card-cta">
                        View Details <ArrowRightIcon size={18} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
