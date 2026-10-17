import fs from 'fs';
import path from 'path';
import CollectionSidebar from '@/components/CollectionSidebar';
import Reveal from '@/components/Reveal';
import { toGalleryImages, versionedImageUrl } from '@/lib/collectionGallery';

export const metadata = { title: 'Natural Laminated Panels | Timbermate-HMT Industries Corp.' };

const IMAGE_ROOT = 'natural-laminated-panels';

const collectionsMeta = [
  {
    name: 'BALU',
    file: 'balu cover.JPG',
    folder: 'balu',
    description: 'Enliven your space with the warm texture of bamboo',
  },
  {
    name: 'BARCELONA',
    file: 'barcelona cover.JPG',
    folder: 'barcelona',
    description: 'Explore and push your imagination to another level with this exquisite panel collection',
  },
  {
    name: 'BATAKAN',
    file: 'batakan cover.JPG',
    folder: 'batakan',
    description: 'Add vibrance to any space with these textured pieces',
  },
  {
    name: 'CANA',
    file: 'cana cover.JPG',
    folder: 'cana',
    description: 'Bring nature closer to home with the pleasant materials and color variations of these pieces',
  },
  {
    name: 'CIRKULO',
    file: 'cirkulo cover.JPG',
    folder: 'cirkulo',
    description: 'Add life to your home with this natural circular design',
  },
  {
    name: 'COCOTERO',
    file: 'cocotero cover.JPG',
    folder: 'cocotero',
    description: 'Transform interior spaces into works of art with these pieces of nature',
  },
  {
    name: 'COMBINATION',
    file: 'combination cover.jpg',
    folder: 'combination',
    description: 'Compose a richer interior story by blending distinctive materials and finishes in one collection',
  },
  {
    name: 'MOP: PINCTADA - GALLERY 1',
    file: 'mop pinctada gallery 1 cover.jpg',
    folder: 'mop pinctada 1',
    description: 'Add elegance to any room with these expertly handcrafted mother of pearl mosaic tiles',
  },
  {
    name: 'MOP: PINCTADA - GALLERY 2',
    file: 'mop pinctada gallery 2.JPG',
    folder: 'mop pinctada 2',
    description: 'Invigorate your home with handcrafted mother of pearl mosaic tiles',
  },
  {
    name: 'PALM',
    file: 'palm cover.jpg',
    folder: 'palm',
    description: 'Add luxurious dimensions to any living space with these refreshing combination of materials',
  },
  {
    name: 'PASINGAN',
    file: 'pasingan cover.JPG',
    folder: 'pasingan',
    description: 'Enrich your interiors with the refined grain and natural character of these panels',
  },
  {
    name: 'RECYCLED WOOD',
    file: 'recycled wood cover.JPG',
    folder: 'recycled wood',
    description: 'Celebrate sustainability with reclaimed wood panels rich in history and texture',
  },
  {
    name: 'SAHARA',
    file: 'sahara cover.jpg',
    folder: 'sahara',
    description: 'Warm any room with the sunlit tones and organic depth of these desert-inspired panels',
  },
  {
    name: 'SINSIN',
    file: 'sinsin cover.JPG',
    folder: 'sinsin',
    description: 'Soften your interiors with the subtle weave and natural charm of these panels',
  },
  {
    name: 'VASCO',
    file: 'vasco cover.jpg',
    folder: 'vasco',
    description: 'Indulge in the relaxing tone of nature with these pieces',
  },
];

function loadGallery(folder: string) {
  const dir = path.join(process.cwd(), 'public', 'assets', 'images', IMAGE_ROOT, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file) && !/^cover\.jpg$/i.test(file))
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
        coverSrc: versionedImageUrl(IMAGE_ROOT, item.folder, 'cover.jpg'),
        description: item.description,
        images: toGalleryImages(`${IMAGE_ROOT}/${item.folder}`, files),
      },
    };
  });
}

export default function NaturalLaminatedPanelsPage() {
  const collections = getCollections();

  return (
    <div className="flex flex-col flex-1">
      <section className="relative h-[50svh] w-full" data-section-id="hero">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${versionedImageUrl('panel-collection', 'cover.jpg')}')` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <Reveal>
            <h1 className="font-adobe-aldine text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              Natural Laminated Panels
            </h1>
          </Reveal>
        </div>
      </section>
      <CollectionSidebar
        title="Natural Laminated Panels"
        imageFolder={IMAGE_ROOT}
        collections={collections}
      />
    </div>
  );
}
