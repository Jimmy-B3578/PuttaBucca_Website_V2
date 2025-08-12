import { products } from '../../config/products.config';
import Image from 'next/image';
import Link from 'next/link';
import ProductDetailClient from '../../components/ProductDetailClient';

// Helper function to generate slugs, in a real app this would be more robust
const slugify = (text) => text.toString().toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/--+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');

const ProductDetailPage = async ({ params }) => {
  const { slug } = await params;
  const product = products.find(p => slugify(p.name) === slug);

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <h1>Product Not Found</h1>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <Link href="/products" className="cta-button">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="container product-detail-page">
        <nav className="product-breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> 
            {product.category && (
              <>
                / <Link href={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
              </>
            )}
            / <span>{product.name}</span>
        </nav>
        <div className={`product-detail-container ${product.category === 'Bagged Products' ? 'bagged-product' : ''}`}>
            <div className="product-image-gallery">
                <div className="product-main-image">
                    <Image src={product.image} alt={product.name} width={600} height={600} style={{objectFit: 'cover'}} />
                </div>
            </div>
            <div className="product-info-column">
                <span className="category-badge">{product.category}</span>
                <h1>{product.name}</h1>

                <div className="price-stock-container">
                    <div className="measurement-info">
                        <span>Measured by:</span>
                        <strong>
                            {product.unit === 'per tonne' ? 'Weight (tonnes)' : 
                             product.unit === 'per 20KG bag' ? 'Per Bag (20KG bags)' :
                             product.unit === 'per m³' ? 'Volume (m³)' :
                             product.unit === 'per cubic meter' ? 'Volume (m³)' :
                             product.unit === 'per unit' ? 'Individual units' :
                             product.unit === 'per roll' ? 'Rolls' :
                             'Volume (m³)'}
                        </strong>

                    </div>
                    <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>

                <p className="description">{product.description}</p>
                
                {(() => {
                    const validSpecs = Object.entries(product.specifications)
                        .filter(([key, value]) => value && value.trim() !== '');
                    
                    const hasFeatures = product.featuresAndApplications && product.featuresAndApplications.length > 0;
                    const hasSpecs = validSpecs.length > 0;
                    const singleSection = (hasSpecs && !hasFeatures) || (!hasSpecs && hasFeatures);
                    
                    return (
                        <div className={`product-details-grid ${singleSection ? 'single-section' : ''}`}>
                            {/* Only show specifications if there are non-empty values */}
                            {hasSpecs && (
                                <div className="product-specs">
                                    <h3>Specifications</h3>
                                    <ul>
                                        {product.unit === 'per tonne' && product.density != null && product.density !== '' && (
                                            <li><strong>Density:</strong> {product.density} tonnes per m³</li>
                                        )}
                                        {validSpecs.map(([key, value]) => (
                                            <li key={key}><strong>{key}:</strong> {value}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {hasFeatures && (
                                <div className="product-applications">
                                    <h3>Features and Applications</h3>
                                    <ul>
                                        {product.featuresAndApplications.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })()}

                <div className="delivery-info">
                    <p>{product.deliveryInfo}</p>
                </div>

                <ProductDetailClient product={product} />
            </div>
        </div>
    </div>
  );
};

export default ProductDetailPage;

// This function tells Next.js which routes to pre-render at build time.
export async function generateStaticParams() {
  return products.map(product => ({
    slug: slugify(product.name),
  }));
} 