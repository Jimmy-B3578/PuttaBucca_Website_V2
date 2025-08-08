'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { products } from '../config/products.config.js';
import CategoryFilter from '../components/CategoryFilter';

// Helper function to generate slugs
const slugify = (text) => text.toString().toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/--+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize and update category from URL parameter
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    setSelectedCategory(categoryFromUrl || '');
    setIsInitialized(true);
  }, [searchParams]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      router.push(`/products?category=${encodeURIComponent(category)}`);
    } else {
      router.push('/products');
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

  // Don't render until we've initialized the category from URL
  if (!isInitialized) {
    return (
      <div className="container">
        <h1 className="section-title" style={{ textAlign: 'center', marginTop: '40px' }}>Our Products</h1>
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="section-title" style={{ textAlign: 'center', marginTop: '40px' }}>Our Products</h1>
      
      <CategoryFilter 
        products={products}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      {Object.entries(groupedProducts).map(([category, productsInCategory]) => (
        <div key={category} className="product-category-group">
          <h2 className="category-title">{category}</h2>
          <div className="product-grid">
            {productsInCategory.map((product) => (
              <div key={product.id} className={`card ${product.category === 'Bagged Products' ? 'bagged-product' : ''}`}>
                <Image src={product.image} alt={product.name} width={300} height={200} style={{ objectFit: 'cover' }} />
                <div className="card-content">
                  <span className="product-category">{product.category}</span>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  {product.featuresAndApplications && product.featuresAndApplications.length > 0 && (
                    <ul className="product-features">
                      {product.featuresAndApplications.slice(0, 2).map((item, index) => (
                        <li key={index}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                          </svg>
                          {item}
                        </li>
                      ))}
                      {product.featuresAndApplications.length > 2 && (
                        <li className="more-features">
                          <span>more features & applications on details page</span>
                        </li>
                      )}
                    </ul>
                  )}
                  <Link href={`/products/${slugify(product.name)}`} className="cta-button">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 