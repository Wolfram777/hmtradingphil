'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const BRAND_RED = '#8b0c0b';
const AUTOPLAY_MS = 5000;

const collections = [
  'balue',
  'barcelona',
  'batakan',
  'cana',
  'cirkulo',
  'cocotero',
  'combination',
  'palm',
  'pasingan',
  'recycled wood',
].map((file) => ({
  name: file.replace(/\b\w/g, (c) => c.toUpperCase()),
  src: encodeURI(`/assets/images/panel-collection/${file}.jpg`),
}));

// Horizontal offsets are multiples of the square size so spacing scales with it.
const SLOT_STYLES: Record<number, { x: number; rotate: number; scale: number }> = {
  0: { x: 0, rotate: 0, scale: 1 },
  1: { x: 0.95, rotate: -45, scale: 0.9 },
  2: { x: 1.7, rotate: -55, scale: 0.8 },
  3: { x: 2.3, rotate: -60, scale: 0.6 },
};

export default function CollectionsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = collections.length;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  const go = (step: number) => setActive((i) => (i + step + count) % count);
  const touchStartX = useRef<number | null>(null);

  return (
    <div
      className="relative w-full flex-1 flex flex-col md:flex-row items-center justify-center [--size:clamp(150px,17vw,260px)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="relative h-[calc(var(--size)+4rem)] w-full [perspective:1200px]">
        {collections.map((item, index) => {
          let offset = (index - active + count) % count;
          if (offset > count / 2) offset -= count;

          const distance = Math.min(Math.abs(offset), 3);
          const side = Math.sign(offset);
          const slot = SLOT_STYLES[distance];
          const visible = Math.abs(offset) <= 2;

          return (
            <figure
              key={item.name}
              className="absolute left-1/2 top-0 w-[var(--size)] -ml-[calc(var(--size)/2)] transition-[transform,opacity] duration-700 ease-out [transform-style:preserve-3d]"
              style={{
                transform: `translateX(calc(var(--size) * ${slot.x * side})) rotateY(${slot.rotate * side}deg) scale(${slot.scale})`,
                opacity: visible ? 1 : 0,
                zIndex: 10 - distance,
                pointerEvents: visible ? 'auto' : 'none',
              }}
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${item.name}`}
                className="relative block aspect-square w-full overflow-hidden rounded-md shadow-[0_24px_40px_-8px_rgba(0,0,0,0.55)] cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </button>
              <figcaption
                className="font-archivo-narrow font-semibold text-center uppercase tracking-wide mt-4 text-base md:text-xl"
                style={{ color: BRAND_RED }}
              >
                {item.name}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* Arrows sit below the track on mobile and at the sides from md up */}
      <div className="flex gap-6 mt-2 md:contents">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous collection"
          className="btn-white-to-red md:absolute md:left-10 md:top-1/2 md:-translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next collection"
          className="btn-white-to-red md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
