type ComingSoonProps = {
  title: string;
};

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <section
      data-section-id="coming-soon"
      className="min-h-svh w-full bg-white flex flex-col items-center justify-center px-6 text-center"
    >
      <p className="font-archivo-narrow font-semibold tracking-[0.2em] uppercase mb-4 text-sm md:text-base" style={{ color: '#8b0c0b' }}>
        {title}
      </p>
      <h1 className="font-adobe-aldine text-5xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ color: '#8b0c0b' }}>
        Coming Soon
      </h1>
      <p className="font-archivo-narrow text-lg md:text-xl max-w-xl" style={{ color: '#8b0c0b' }}>
        We&apos;re working on this page. Please check back soon.
      </p>
    </section>
  );
}
