import fs from 'fs';
import path from 'path';
import { versionedImageUrl } from '@/lib/collectionGallery';

export type OtherProduct = {
  id: string;
  name: string;
  src: string;
};

export type OtherProductCategory = {
  name: string;
  slug: string;
  products: OtherProduct[];
};

const IMAGE_ROOT = 'other-products';

const SKIP_FILES = /^(footer_icons|hmt_logo)\.(jpe?g|png|webp)$/i;

/** One sidebar/nav category per product folder. */
const CATEGORIES: { name: string; slug: string; folder: string }[] = [
  { name: 'ADHESIVES', slug: 'adhesives', folder: 'adhesives' },
  { name: 'CHEMICALS', slug: 'chemicals', folder: 'chemicals' },
  { name: 'DESSICANT', slug: 'dessicant', folder: 'dessicant' },
  { name: 'ELECTRICAL FITTINGS', slug: 'electrical-fittings', folder: 'electrical fittings' },
  { name: 'FABRICS', slug: 'fabrics', folder: 'fabrics' },
  { name: 'FILLERS', slug: 'fillers', folder: 'fillers' },
  { name: 'SCRAPERS & GLUE SPREADER', slug: 'scrapers-and-glue-spreader', folder: 'scrapers' },
  { name: 'NAILS', slug: 'nails', folder: 'nails' },
];

const labelFromFile = (file: string) =>
  file
    .replace(/\.[^.]+$/, '')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const productId = (categorySlug: string, file: string) =>
  `${categorySlug}-${file.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

function loadProducts(categorySlug: string, folder: string): OtherProduct[] {
  const dir = path.join(process.cwd(), 'public', 'assets', 'images', IMAGE_ROOT, folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file) && !SKIP_FILES.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .map((file) => ({
      id: productId(categorySlug, file),
      name: labelFromFile(file),
      src: versionedImageUrl(IMAGE_ROOT, folder, file),
    }));
}

export function getOtherProductCategories(): OtherProductCategory[] {
  return CATEGORIES.map((category) => ({
    name: category.name,
    slug: category.slug,
    products: loadProducts(category.slug, category.folder),
  }));
}
