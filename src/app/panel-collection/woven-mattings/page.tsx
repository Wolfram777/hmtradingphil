import fs from 'fs';
import path from 'path';
import CollectionSidebar from '@/components/CollectionSidebar';
import { toGalleryImages, versionedImageUrl } from '@/lib/collectionGallery';

export const metadata = { title: 'Woven Mattings | Timbermate-HMT Industries Corp.' };

const IMAGE_ROOT = 'woven-mattings';

const SKIP_FILES = /^(cover\.jpg|footer_icons\.jpg|hmt_logo\.jpg)$/i;

const collectionsMeta = [
  { name: 'RATTAN MATS', file: 'rattan mats.jpg', folder: 'rattan' },
  { name: 'SET 1', file: 'set 1.jpg', folder: 'set1' },
  { name: 'SET 2', file: 'set 2.jpg', folder: 'set2' },
  { name: 'SET 3', file: 'set 3.jpg', folder: 'set3' },
];

function loadGallery(folder: string) {
  const dir = path.join(process.cwd(), 'public', 'assets', 'images', IMAGE_ROOT, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file) && !SKIP_FILES.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
}

function getCollections() {
  return collectionsMeta.map((item) => {
    const dir = path.join(process.cwd(), 'public', 'assets', 'images', IMAGE_ROOT, item.folder);
    const cardSrc = versionedImageUrl(IMAGE_ROOT, item.file);

    if (!fs.existsSync(dir)) {
      return { name: item.name, file: item.file, src: cardSrc };
    }

    const files = loadGallery(item.folder);
    return {
      name: item.name,
      file: item.file,
      src: cardSrc,
      gallery: {
        name: item.name,
        images: toGalleryImages(`${IMAGE_ROOT}/${item.folder}`, files),
      },
    };
  });
}

export default function WovenMattingsPage() {
  const collections = getCollections();

  return (
    <div className="flex flex-col flex-1">
      <section className="relative h-[50svh] w-full" data-section-id="hero">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${versionedImageUrl(IMAGE_ROOT, 'woven mattings cover.jpg')}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-adobe-aldine text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Woven Mattings
          </h1>
        </div>
      </section>
      <CollectionSidebar
        title="Woven Mattings"
        imageFolder={IMAGE_ROOT}
        collections={collections}
      />
    </div>
  );
}
