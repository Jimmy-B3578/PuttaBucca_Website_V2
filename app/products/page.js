'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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

  // Handle category change
  const handleCategoryChange = (category) => {
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
