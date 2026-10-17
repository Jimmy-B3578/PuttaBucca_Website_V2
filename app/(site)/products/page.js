import { getProducts } from '../../lib/products';
import ProductsList from './ProductsList';

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsList products={products} />;
}
