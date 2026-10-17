import Link from 'next/link';
import { getProducts } from '../lib/products';

// A run of real materials from the yard, edge to edge, like a sample board.
// Each swatch is a crop of that product's own photo and links to its page.
const swatches = [
  { product: 'Yellow Brickie Sand', image: '/images/textures/strip-yellow-brickie-sand.jpg' },
  { product: '14/20 Rivergravel', image: '/images/textures/strip-river-gravel.jpg', label: '14/20 River Gravel' },
  { product: 'Cypress Pine Chip', image: '/images/textures/strip-cypress-pine-chip.jpg' },
  { product: 'Black Crusher Dust', image: '/images/textures/strip-black-crusher-dust.jpg' },
  { product: 'Red Granite', image: '/images/textures/strip-red-granite.jpg' },
  { product: 'Organic Garden Mix (OGM)', image: '/images/textures/strip-organic-garden-mix.jpg', label: 'Organic Garden Mix' },
];

export default async function MaterialStrip() {
  const products = await getProducts();
  // Skip any swatch whose product has been renamed or removed in Keystatic
  const items = swatches
    .map((s) => ({ ...s, slug: products.find((p) => p.name === s.product)?.slug }))
    .filter((s) => s.slug);

  return (
    <nav className="material-strip" aria-label="A few of our materials">
      {items.map((s) => (
        <Link key={s.product} href={`/products/${s.slug}`} prefetch={false} className="material-swatch">
          <img src={s.image} alt="" loading="lazy" width="640" height="320" />
          <span className="material-swatch-label">{s.label || s.product}</span>
        </Link>
      ))}
    </nav>
  );
}
