import CollectionSidebar from '@/components/CollectionSidebar';

export const metadata = { title: 'Natural Laminated Panels | Timbermate-HMT Industries Corp.' };

export default function NaturalLaminatedPanelsPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="relative h-[50svh] w-full" data-section-id="hero">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/images/panel-collection/cover.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-adobe-aldine text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Natural Laminated Panels
          </h1>
        </div>
      </section>
      <CollectionSidebar />
    </div>
  );
}
