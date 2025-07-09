import Image from 'next/image';
import { products } from '../config/products.config.js';

export default function ProductsPage() {
  return (
    <div className="container">
      <h1 className="section-title" style={{ textAlign: 'center', marginTop: '40px' }}>Our Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <Image src={product.image} alt={product.name} width={300} height={200} style={{ objectFit: 'cover' }} />
            <div className="card-content">
              <span className="product-category">{product.category}</span>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <ul className="product-features">
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#" className="cta-button">View Details</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 