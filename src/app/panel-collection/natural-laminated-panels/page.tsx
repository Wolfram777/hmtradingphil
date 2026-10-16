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
      <section
        data-section-id="coming-soon"
        className="w-full bg-white flex flex-col items-center justify-center px-6 py-24 text-center"
      >
        <h2 className="font-adobe-aldine text-4xl md:text-5xl font-bold mb-4" style={{ color: '#8b0c0b' }}>
          Coming Soon
        </h2>
        <p className="font-archivo-narrow text-lg md:text-xl max-w-xl" style={{ color: '#8b0c0b' }}>
          We&apos;re working on this page. Please check back soon.
        </p>
      </section>
    </div>
  );
}
