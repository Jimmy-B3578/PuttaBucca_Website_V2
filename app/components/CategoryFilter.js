'use client';

import { useEffect, useMemo, useRef } from 'react';

const CategoryFilter = ({ products, onCategoryChange, selectedCategory }) => {
  const scrollerRef = useRef(null);

  // Worked out during render (not in an effect) so the bar is in the server HTML
  // and does not pop in and shove the page down after hydration
  const categories = useMemo(
    () => [...new Set(products.map(product => product.category).filter(cat => cat && cat.trim() !== ''))],
    [products]
  );

  // Keep the selected chip in view inside the horizontally scrolling bar
  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = scroller?.querySelector('.category-filter-btn.active');
    if (!scroller || !active) return;
    const left = active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [selectedCategory]);

  if (categories.length === 0) {
    return null; // Don't show filter if no categories
  }

  return (
    <nav className="category-filter" aria-label="Filter products by category">
      <div className="container">
        <div className="category-filter-container" ref={scrollerRef}>
          <button
            type="button"
            className={`category-filter-btn ${!selectedCategory ? 'active' : ''}`}
            aria-pressed={!selectedCategory}
            onClick={() => onCategoryChange('')}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
              aria-pressed={selectedCategory === category}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryFilter;
