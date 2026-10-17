import CollectionSidebar from '@/components/CollectionSidebar';
import { versionedImageUrl } from '@/lib/collectionGallery';

export const metadata = { title: 'Woven Mattings | Timbermate-HMT Industries Corp.' };

const collectionsMeta = [
  { name: 'RATTAN MATS', file: 'rattan mats.jpg' },
  { name: 'SET 1', file: 'set 1.jpg' },
  { name: 'SET 2', file: 'set 2.jpg' },
  { name: 'SET 3', file: 'set 3.jpg' },
];

export default function WovenMattingsPage() {
  const collections = collectionsMeta.map((item) => ({
    name: item.name,
    file: item.file,
    src: versionedImageUrl('woven-mattings', item.file),
  }));

  return (
    <div className="flex flex-col flex-1">
      <section className="relative h-[50svh] w-full" data-section-id="hero">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${versionedImageUrl('woven-mattings', 'woven mattings cover.jpg')}')`,
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
        imageFolder="woven-mattings"
        collections={collections}
      />
    </div>
  );
}
