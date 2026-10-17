import { config, fields, collection } from '@keystatic/core';
import { slugify } from './app/lib/slugify';

// The order here is the order categories appear on the site.
export const productCategories = [
  'Aggregates',
  'Soil',
  'Sand',
  'Pebbles',
  'Mulch',
  'Sandstone',
  'Random and unique',
  'Bagged Products',
];

// On your computer (npm run dev) edits save straight to the files in content/.
// On the live site they are saved as commits to GitHub, and Vercel redeploys.
// Set NEXT_PUBLIC_KEYSTATIC_STORAGE=github locally to try GitHub mode (needed once for the GitHub App setup).
const useGitHub = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === 'github';

export default config({
  storage: useGitHub
    ? { kind: 'github', repo: 'Jimmy-B3578/PuttaBucca_Website_V2' }
    : { kind: 'local' },
  ui: {
    brand: { name: 'Putta Bucca' },
  },
  collections: {
    products: collection({
      label: 'Products',
      slugField: 'name',
      path: 'content/products/*',
      format: { data: 'yaml' },
      columns: ['category', 'inStock'],
      previewUrl: '/products/{slug}',
      schema: {
        name: fields.slug({
          name: { label: 'Product name', validation: { isRequired: true } },
          slug: {
            label: 'Web address',
            description: 'The end of the product page link. Changing it breaks any old links to this product.',
            generate: slugify,
          },
        }),
        category: fields.select({
          label: 'Category',
          options: productCategories.map((c) => ({ label: c, value: c })),
          defaultValue: 'Aggregates',
        }),
        image: fields.image({
          label: 'Photo',
          directory: 'public/images/products',
          publicPath: '/images/products/',
          validation: { isRequired: true },
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        featuresAndApplications: fields.array(
          fields.text({ label: 'Feature or use' }),
          {
            label: 'Features and applications',
            description: 'The first two show on the products page; all of them show on the product page.',
            itemLabel: (props) => props.value || 'New item',
          }
        ),
        unit: fields.select({
          label: 'Sold by',
          options: [
            { label: 'Per tonne', value: 'per tonne' },
            { label: 'Per m³', value: 'per m³' },
            { label: 'Per 20KG bag', value: 'per 20KG bag' },
            { label: 'Per unit', value: 'per unit' },
            { label: 'Per roll', value: 'per roll' },
          ],
          defaultValue: 'per tonne',
        }),
        density: fields.number({
          label: 'Density (tonnes per m³)',
          description: 'Used by the calculator to estimate tonnes. Only shown for products sold per tonne.',
          step: 0.1,
          validation: { min: 0 },
        }),
        inStock: fields.checkbox({ label: 'In stock', defaultValue: true }),
        specifications: fields.object(
          {
            color: fields.text({ label: 'Colour' }),
            size: fields.text({ label: 'Size' }),
            material: fields.text({ label: 'Material' }),
          },
          { label: 'Specifications', description: 'Leave any of these blank to hide it.' }
        ),
        deliveryInfo: fields.text({
          label: 'Delivery note',
          multiline: true,
          defaultValue: 'Available for bulk delivery in Mudgee and surrounding areas. Contact us for a quote.',
        }),
        sortOrder: fields.integer({
          label: 'Display order',
          description: 'Lower numbers show first within the category.',
          defaultValue: 100,
        }),
      },
    }),
  },
});
