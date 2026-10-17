import 'server-only';
import { cache } from 'react';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig, { productCategories } from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

const categoryRank = (category) => {
  const i = productCategories.indexOf(category);
  return i === -1 ? productCategories.length : i;
};

// All products from content/products (edited in Keystatic), in the order the site shows them:
// by category, then by each product's display order, then by name.
export const getProducts = cache(async () => {
  const entries = await reader.collections.products.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      name: entry.name,
      image: entry.image,
      description: entry.description,
      category: entry.category,
      featuresAndApplications: entry.featuresAndApplications,
      unit: entry.unit,
      density: entry.density,
      inStock: entry.inStock,
      specifications: {
        Color: entry.specifications.color,
        Size: entry.specifications.size,
        Material: entry.specifications.material,
      },
      deliveryInfo: entry.deliveryInfo,
      sortOrder: entry.sortOrder ?? 100,
    }))
    .sort((a, b) =>
      categoryRank(a.category) - categoryRank(b.category)
      || a.sortOrder - b.sortOrder
      || a.name.localeCompare(b.name)
    );
});

export const getProduct = async (slug) => (await getProducts()).find((p) => p.slug === slug);
