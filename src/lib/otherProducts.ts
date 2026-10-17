import fs from 'fs';
import path from 'path';
import { toGalleryImages, versionedImageUrl, type GalleryImage } from '@/lib/collectionGallery';

export type OtherProductGallery = {
  name: string;
  images: GalleryImage[];
};

export type OtherProduct = {
  id: string;
  name: string;
  src: string;
  /** When set, card opens a collection carousel modal instead of a single-image preview. */
  gallery?: OtherProductGallery;
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

const productId = (categorySlug: string, key: string) =>
  `${categorySlug}-${key.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

function listImageFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file) && !SKIP_FILES.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
}

function loadProducts(categorySlug: string, folder: string): OtherProduct[] {
  const dir = path.join(process.cwd(), 'public', 'assets', 'images', IMAGE_ROOT, folder);
  return listImageFiles(dir).map((file) => ({
    id: productId(categorySlug, file),
    name: labelFromFile(file),
    src: versionedImageUrl(IMAGE_ROOT, folder, file),
  }));
}

const FABRIC_GROUP_NAMES: Record<string, string> = {
  'fabric_cotton.php': '100% INDIAN COTTON',
  'fabric_liquid.php': 'LIQUID REPELLANT',
  'fabric_polyester.php': '100% POLYESTER',
  'fabric_water.php': 'WATER REPELLANT & UV RESISTANT',
  'fabric_whelk.php': 'WHELK',
};

function fabricGroupName(folder: string) {
  return (
    FABRIC_GROUP_NAMES[folder] ??
    folder
      .replace(/^fabric_/i, '')
      .replace(/\.php$/i, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

/** Fabrics: root images are covers; each subfolder is a fabric group with its own gallery. */
function loadFabricsProducts(categorySlug: string, folder: string): OtherProduct[] {
  const rootDir = path.join(process.cwd(), 'public', 'assets', 'images', IMAGE_ROOT, folder);
  if (!fs.existsSync(rootDir)) return [];

  const rootCovers = new Set(listImageFiles(rootDir));
  const subfolders = fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  if (subfolders.length === 0) {
    return loadProducts(categorySlug, folder);
  }

  return subfolders.flatMap((subfolder) => {
    const files = listImageFiles(path.join(rootDir, subfolder));
    if (files.length === 0) return [];

    const name = fabricGroupName(subfolder);
    const coverFile = files.find((file) => rootCovers.has(file)) ?? files[0];
    const coverInRoot = rootCovers.has(coverFile);

    return [
      {
        id: productId(categorySlug, subfolder),
        name,
        src: coverInRoot
          ? versionedImageUrl(IMAGE_ROOT, folder, coverFile)
          : versionedImageUrl(IMAGE_ROOT, folder, subfolder, coverFile),
        gallery: {
          name,
          images: toGalleryImages(`${IMAGE_ROOT}/${folder}/${subfolder}`, files),
        },
      },
    ];
  });
}

export function getOtherProductCategories(): OtherProductCategory[] {
  return CATEGORIES.map((category) => ({
    name: category.name,
    slug: category.slug,
    products:
      category.slug === 'fabrics'
        ? loadFabricsProducts(category.slug, category.folder)
        : loadProducts(category.slug, category.folder),
  }));
}
