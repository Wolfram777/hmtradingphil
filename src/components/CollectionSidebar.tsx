'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const collections = [
  { name: 'BALU COLLECTION', file: 'balu cover.JPG' },
  { name: 'BARCELONA COLLECTION', file: 'barcelona cover.JPG' },
  { name: 'BATAKAN COLLECTION', file: 'batakan cover.JPG' },
  { name: 'CANA COLLECTION', file: 'cana cover.JPG' },
  { name: 'CIRKULO COLLECTION', file: 'cirkulo cover.JPG' },
  { name: 'COCOTERO COLLECTION', file: 'cocotero cover.JPG' },
  { name: 'COMBINATION COLLECTION', file: 'combination cover.jpg' },
  { name: 'MOP: PINCTADA COLLECTION - GALLERY 1', file: 'mop pinctada gallery 1 cover.jpg' },
  { name: 'MOP: PINCTADA COLLECTION - GALLERY 2', file: 'mop pinctada gallery 2.JPG' },
  { name: 'PALM COLLECTION', file: 'palm cover.jpg' },
  { name: 'PASINGAN COLLECTION', file: 'pasingan cover.JPG' },
  { name: 'RECYCLED WOOD COLLECTION', file: 'recycled wood cover.JPG' },
  { name: 'SAHARA COLLECTION', file: 'sahara cover.jpg' },
  { name: 'SINSIN COLLECTION', file: 'sinsin cover.JPG' },
  { name: 'VASCO COLLECTION', file: 'vasco cover.jpg' },
];

const slug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function CollectionSidebar() {
  const [active, setActive] = useState(collections[0].name);
  const [query, setQuery] = useState('');
  const sidebarRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const list = scrollRef.current;
    if (!sidebar || !list) return;

    const onWheel = (e: WheelEvent) => {
      if (list.scrollHeight <= list.clientHeight) return;
      e.preventDefault();
      e.stopPropagation();
      const maxScroll = list.scrollHeight - list.clientHeight;
      list.scrollTop = Math.min(maxScroll, Math.max(0, list.scrollTop + e.deltaY));
    };

    sidebar.addEventListener('wheel', onWheel, { passive: false });
    return () => sidebar.removeEventListener('wheel', onWheel);
  }, []);

  const filtered = collections.filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const select = (name: string) => {
    setActive(name);
    document.getElementById(slug(name))?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section
      data-section-id="collections"
      className="w-full bg-white flex flex-col md:flex-row min-h-[50svh]"
    >
      <aside
        ref={sidebarRef}
        data-lenis-prevent
        className="w-full md:w-80 lg:w-96 shrink-0 bg-white md:sticky md:top-20 md:max-h-[calc(100svh-5rem)] md:h-[calc(100svh-5rem)] md:flex md:flex-col"
      >
        <div className="shrink-0 px-6 md:px-8 pt-12 md:pt-16 pb-4 bg-white">
          <h2 className="font-archivo-narrow font-bold tracking-[0.18em] uppercase text-sm mb-4" style={{ color: '#8b0c0b' }}>
            Natural Laminated Panels
          </h2>
          <label className="block">
            <span className="sr-only">Search collections</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collections"
              className="w-full font-archivo-narrow font-semibold text-sm px-3 py-2.5 rounded border border-[#8b0c0b] text-[#8b0c0b] placeholder:text-[#8b0c0b]/50 bg-white outline-none focus:ring-2 focus:ring-[#8b0c0b]/30"
            />
          </label>
        </div>
        <div
          ref={scrollRef}
          className="md:flex-1 md:min-h-0 md:overflow-y-auto overscroll-contain px-6 md:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <nav aria-label="Natural laminated panel collections" className="pb-10">
            <ul className="space-y-1">
              {filtered.length === 0 && (
                <li className="font-archivo-narrow font-semibold text-sm uppercase pl-[4em] pr-3 py-2.5 text-[#8b0c0b]/60">
                  No collections found
                </li>
              )}
              {filtered.map((item) => {
                const selected = item.name === active;
                return (
                  <li key={item.name}>
                    <button
                      type="button"
                      onClick={() => select(item.name)}
                      className={`w-full text-left font-archivo-narrow font-semibold uppercase text-sm md:text-[15px] leading-snug pl-[4em] pr-3 py-2.5 rounded text-[#8b0c0b] hover:bg-[#8b0c0b] hover:text-white ${
                        selected ? 'bg-[#8b0c0b] text-white' : ''
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      <div className="flex-1 px-5 sm:px-8 pt-12 md:pt-16 pb-12 md:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-7xl">
          {filtered.length === 0 && (
            <p className="col-span-full font-archivo-narrow text-lg text-[#8b0c0b]">
              No collections match &ldquo;{query}&rdquo;.
            </p>
          )}
          {filtered.map((item) => (
            <button
              key={item.name}
              id={slug(item.name)}
              type="button"
              onClick={() => setActive(item.name)}
              className="group relative aspect-[80/99] rounded-2xl overflow-hidden bg-neutral-900 shadow-[0_24px_40px_-8px_rgba(0,0,0,0.55)] text-left"
            >
              <Image
                src={encodeURI(`/assets/images/natural-laminated-panels/${item.file}`)}
                alt={item.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 100vw"
                className="object-cover scale-[1.02] transition-[scale] duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 px-5 pb-5 md:px-6 md:pb-6">
                <p className="font-archivo-narrow font-semibold text-white text-left text-xl md:text-2xl [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
                  <span className="pb-1 bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[position:0_100%] bg-[length:0%_2px] group-hover:bg-[length:100%_2px] transition-[background-size] duration-300 ease-out">
                    {item.name}
                  </span>
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
