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
    <div className="category-filter">
      <div className="category-filter-container">
        <button 
          className={`category-filter-btn ${!selectedCategory ? 'active' : ''}`}
          onClick={() => onCategoryChange('')}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
