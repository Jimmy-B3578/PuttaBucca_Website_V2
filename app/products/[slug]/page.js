import { products } from '../../config/products.config';
import { siteConfig } from '../../config/site.config';
import Image from 'next/image';
import Link from 'next/link';
import ProductDetailClient from '../../components/ProductDetailClient';
import { CheckIcon, PhoneIcon, TruckIcon } from '../../components/Icons';

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
      <div className="container not-found">
        <h1>Product Not Found</h1>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <Link href="/products" className="btn btn-primary">Back to Products</Link>
      </div>
    );
  }

  const validSpecs = Object.entries(product.specifications)
    .filter(([key, value]) => value && value.trim() !== '');
  const hasFeatures = product.featuresAndApplications && product.featuresAndApplications.length > 0;
  const hasSpecs = validSpecs.length > 0;

  return (
    <div className="container product-detail-page">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
            <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/products">Products</Link></li>
                {product.category && (
                  <li><Link href={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link></li>
                )}
                <li aria-current="page">{product.name}</li>
            </ol>
        </nav>
        <div className={`product-detail-container ${product.category === 'Bagged Products' ? 'bagged-product' : ''}`}>
            <div className="product-main-image">
                <Image src={product.image} alt={product.name} width={720} height={720} sizes="(max-width: 900px) 100vw, 560px" priority />
            </div>
            <div className="product-info-column">
                <h1>{product.name}</h1>

                <div className="price-stock-container">
                    {product.category && (
                        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="category-badge">{product.category}</Link>
                    )}
                    <div className="measurement-info">
                        <span>Measured by</span>
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

                <ProductDetailClient product={product} />
                <p className="detail-call">
                    <PhoneIcon size={18} />
                    <span>Prefer to talk? Call the yard on <a href={siteConfig.phoneHref}>{siteConfig.phone}</a></span>
                </p>

                {(hasSpecs || hasFeatures) && (
                    <div className={`product-details-grid ${hasSpecs && hasFeatures ? '' : 'single-section'}`}>
                        {/* Only show specifications if there are non-empty values */}
                        {hasSpecs && (
                            <div className="product-specs">
                                <h2>Specifications</h2>
                                <dl>
                                    {product.unit === 'per tonne' && product.density != null && product.density !== '' && (
                                        <div><dt>Density</dt><dd>{product.density} tonnes per m³</dd></div>
                                    )}
                                    {validSpecs.map(([key, value]) => (
                                        <div key={key}><dt>{key}</dt><dd>{value}</dd></div>
                                    ))}
                                </dl>
                            </div>
                        )}

                        {hasFeatures && (
                            <div className="product-applications">
                                <h2>Features and Applications</h2>
                                <ul>
                                    {product.featuresAndApplications.map((item, index) => (
                                        <li key={index}><CheckIcon size={16} />{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <div className="delivery-info">
                    <TruckIcon size={22} />
                    <p>{product.deliveryInfo}</p>
                </div>
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
