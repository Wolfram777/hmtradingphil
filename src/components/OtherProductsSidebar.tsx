'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import ProductPreviewModal, { type ProductPreview } from '@/components/ProductPreviewModal';
import Reveal from '@/components/Reveal';
import type { OtherProduct, OtherProductCategory } from '@/lib/otherProducts';

type OtherProductsSidebarProps = {
  categories: OtherProductCategory[];
  initialCategory?: string;
};

function ProductNameMarquee({ name }: { name: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const measure = () => {
      setDistance(Math.max(0, Math.ceil(text.scrollWidth - container.clientWidth)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [name]);

  useEffect(() => {
    const text = textRef.current;
    if (!text || distance <= 0) {
      if (text) {
        text.style.transition = 'none';
        text.style.transform = 'translateX(0)';
      }
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    const scrollMs = Math.max(4000, (distance / 40) * 1000);
    const pauseStartMs = 800;
    const pauseEndMs = 3000;

    const loop = async () => {
      while (!cancelled) {
        text.style.transition = 'none';
        text.style.transform = 'translateX(0)';
        // Force reflow so the jump registers before the next transition
        void text.offsetWidth;

        await wait(pauseStartMs);
        if (cancelled) break;

        text.style.transition = `transform ${scrollMs}ms linear`;
        text.style.transform = `translateX(-${distance}px)`;

        await wait(scrollMs);
        if (cancelled) break;

        await wait(pauseEndMs);
        if (cancelled) break;
      }
    };

    void loop();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      text.style.transition = 'none';
      text.style.transform = 'translateX(0)';
    };
  }, [distance, name]);

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap">
      <span
        ref={textRef}
        className="inline-block font-archivo-narrow font-semibold text-white text-sm md:text-base leading-none will-change-transform"
      >
        {name}
      </span>
    </div>
  );
}

export default function OtherProductsSidebar({
  categories,
  initialCategory,
}: OtherProductsSidebarProps) {
  const firstSlug = categories[0]?.slug ?? '';
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(initialCategory || firstSlug);
  const [activeProduct, setActiveProduct] = useState('');
  const [preview, setPreview] = useState<ProductPreview | null>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCategory && categories.some((c) => c.slug === initialCategory)) {
      setExpanded(initialCategory);
    }
  }, [initialCategory, categories]);

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

  const q = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!q) return categories;
    return categories
      .map((category) => ({
        ...category,
        products: category.products.filter((product) => product.name.toLowerCase().includes(q)),
      }))
      .filter((category) => category.products.length > 0 || category.name.toLowerCase().includes(q));
  }, [categories, q]);

  const activeCategory =
    filteredCategories.find((c) => c.slug === expanded) ?? filteredCategories[0] ?? null;

  const visibleProducts = useMemo(() => {
    if (q) {
      return filteredCategories.flatMap((c) => c.products);
    }
    return activeCategory?.products ?? [];
  }, [q, filteredCategories, activeCategory]);

  const toggleCategory = (slug: string) => {
    setExpanded((prev) => (prev === slug ? '' : slug));
    setActiveProduct('');
  };

  const selectProduct = (product: OtherProduct, categorySlug: string) => {
    setExpanded(categorySlug);
    setActiveProduct(product.id);
    setPreview(product);
    document.getElementById(product.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section
      data-section-id="collections"
      className="w-full bg-white flex flex-col md:flex-row min-h-[calc(100svh-5rem)]"
    >
      <aside
        ref={sidebarRef}
        data-lenis-prevent
        className="w-full md:w-80 lg:w-96 shrink-0 bg-white md:sticky md:top-20 md:max-h-[calc(100svh-5rem)] md:h-[calc(100svh-5rem)] md:flex md:flex-col"
      >
        <Reveal from="left" className="shrink-0">
          <div className="px-6 md:px-8 pt-12 md:pt-16 pb-4 bg-white">
            <h2
              className="font-archivo-narrow font-bold tracking-[0.18em] uppercase text-sm mb-4"
              style={{ color: '#8b0c0b' }}
            >
              Other Products
            </h2>
            <label className="block">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full font-archivo-narrow font-semibold text-sm px-3 py-2.5 rounded border border-[#8b0c0b] text-[#8b0c0b] placeholder:text-[#8b0c0b]/50 bg-white outline-none focus:ring-2 focus:ring-[#8b0c0b]/30"
              />
            </label>
          </div>
        </Reveal>

        <div
          ref={scrollRef}
          className="md:flex-1 md:min-h-0 md:overflow-y-auto overscroll-contain px-6 md:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <Reveal from="left" delay={120}>
            <nav aria-label="Other product categories" className="pb-10">
              <ul className="space-y-1">
                {filteredCategories.length === 0 && (
                  <li className="font-archivo-narrow font-semibold text-sm uppercase pl-3 pr-3 py-2.5 text-[#8b0c0b]/60">
                    No products found
                  </li>
                )}
                {filteredCategories.map((category) => {
                  const isOpen = expanded === category.slug;
                  return (
                    <li key={category.slug}>
                      <button
                        type="button"
                        onClick={() => toggleCategory(category.slug)}
                        aria-expanded={isOpen}
                        className={`w-full flex items-center gap-2 text-left font-archivo-narrow font-semibold uppercase text-sm md:text-[15px] leading-snug pl-3 pr-3 py-2.5 rounded text-[#8b0c0b] hover:bg-[#8b0c0b] hover:text-white ${
                          isOpen ? 'bg-[#8b0c0b] text-white' : ''
                        }`}
                      >
                        <span className="flex-1 min-w-0">{category.name}</span>
                        <svg
                          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {isOpen && category.products.length > 0 && (
                        <ul className="mt-1 mb-2 space-y-0.5 border-l border-[#8b0c0b]/25 ml-3 pl-2">
                          {category.products.map((product) => {
                            const selected = product.id === activeProduct;
                            return (
                              <li key={product.id}>
                                <button
                                  type="button"
                                  onClick={() => selectProduct(product, category.slug)}
                                  className={`w-full text-left font-archivo-narrow text-xs md:text-sm leading-snug px-2 py-1.5 rounded text-[#8b0c0b] hover:bg-[#8b0c0b]/10 ${
                                    selected ? 'bg-[#8b0c0b]/10 font-semibold' : ''
                                  }`}
                                >
                                  {product.name}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Reveal>
        </div>
      </aside>

      <div className="flex-1 px-5 sm:px-8 pt-12 md:pt-16 pb-12 md:pb-16">
        {!q && activeCategory && (
          <Reveal key={activeCategory.slug} delay={80}>
            <h3 className="font-adobe-aldine text-3xl md:text-4xl font-bold text-[#8b0c0b] mb-8">
              {activeCategory.name}
            </h3>
          </Reveal>
        )}
        {q && (
          <Reveal delay={80}>
            <h3 className="font-archivo-narrow text-lg font-semibold text-[#8b0c0b] mb-8 uppercase tracking-wide">
              Search results
            </h3>
          </Reveal>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {visibleProducts.length === 0 && (
            <p className="col-span-full font-archivo-narrow text-lg text-[#8b0c0b]">
              {q ? (
                <>No products match &ldquo;{query}&rdquo;.</>
              ) : (
                <>No products available in this category yet.</>
              )}
            </p>
          )}
          {visibleProducts.map((product, index) => {
            const categorySlug =
              filteredCategories.find((c) => c.products.some((p) => p.id === product.id))?.slug ??
              activeCategory?.slug ??
              '';

            return (
              <Reveal key={product.id} delay={Math.min(index, 11) * 55}>
                <button
                  id={product.id}
                  type="button"
                  onClick={() => selectProduct(product, categorySlug)}
                  className={`group relative aspect-[80/99] w-full rounded-2xl overflow-hidden bg-neutral-900 shadow-[0_10px_24px_-6px_rgba(0,0,0,0.22)] cursor-pointer text-left ${
                    activeProduct === product.id ? 'ring-2 ring-[#8b0c0b] ring-offset-2' : ''
                  }`}
                >
                  <Image
                    src={product.src}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1280px) 18vw, (min-width: 768px) 22vw, (min-width: 640px) 30vw, 45vw"
                    className="object-cover scale-[1.02] transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 h-10 md:h-11 bg-[#8b0c0b] px-3 md:px-4 flex items-center">
                    <ProductNameMarquee name={product.name} />
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <ProductPreviewModal product={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
