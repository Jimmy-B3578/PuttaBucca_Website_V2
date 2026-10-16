'use client';

import { useState, useEffect } from 'react';

const CategoryFilter = ({ products, onCategoryChange, selectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract unique categories from products
    const uniqueCategories = [...new Set(products.map(product => product.category).filter(cat => cat && cat.trim() !== ''))];
    setCategories(uniqueCategories);
  }, [products]);

  if (categories.length === 0) {
    return null; // Don't show filter if no categories
  }

  return (
    <nav className="category-filter" aria-label="Filter products by category">
      <div className="container">
        <div className="category-filter-container">
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
