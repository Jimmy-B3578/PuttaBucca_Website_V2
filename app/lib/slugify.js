// Turns a product name into the part of its web address, e.g. "Red Granite" -> "red-granite".
// Shared by the site and Keystatic so new products get addresses in the same style.
export const slugify = (text) => text.toString().toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/--+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');
