'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type TransitionEvent } from 'react';
import type { GalleryImage } from '@/lib/collectionGallery';

export type CollectionGallery = {
  name: string;
  coverSrc?: string;
  description?: string;
  images: GalleryImage[];
};

type CollectionModalProps = {
  gallery: CollectionGallery | null;
  onClose: () => void;
};

const PAGE_SIZE = 3;
const SLIDE_MS = 500;
const EXIT_MS = 600;

export default function CollectionModal({ gallery, onClose }: CollectionModalProps) {
  // Keep content mounted while exit animation plays
  const [displayed, setDisplayed] = useState<CollectionGallery | null>(gallery);
  const [exiting, setExiting] = useState(false);

  // trackPage indexes into [cloneLast, ...realPages, cloneFirst]
  const [trackPage, setTrackPage] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const locked = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCloseRef = useRef(onClose);
  const imageCountRef = useRef(0);
  const pageCountRef = useRef(1);
  const trackPageRef = useRef(1);
  const exitingRef = useRef(false);

  onCloseRef.current = onClose;
  trackPageRef.current = trackPage;
  exitingRef.current = exiting;

  const count = displayed?.images.length ?? 0;
  const pageCount = Math.max(1, Math.ceil(count / PAGE_SIZE));
  imageCountRef.current = count;
  pageCountRef.current = pageCount;

  const clearUnlockTimer = () => {
    if (unlockTimer.current) {
      clearTimeout(unlockTimer.current);
      unlockTimer.current = null;
    }
  };

  const unlock = () => {
    clearUnlockTimer();
    locked.current = false;
    setIsSliding(false);
  };

  const lock = () => {
    locked.current = true;
    setIsSliding(true);
    clearUnlockTimer();
    unlockTimer.current = setTimeout(unlock, SLIDE_MS + 80);
  };

  const requestClose = () => {
    if (exitingRef.current || !displayed) return;
    setExiting(true);
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => {
      onCloseRef.current();
      setDisplayed(null);
      setExiting(false);
      exitTimer.current = null;
    }, EXIT_MS);
  };

  useEffect(() => {
    if (gallery) {
      if (exitTimer.current) {
        clearTimeout(exitTimer.current);
        exitTimer.current = null;
      }
      setDisplayed(gallery);
      setExiting(false);
      setTrackPage(1);
      setAnimate(false);
      unlock();
    }
  }, [gallery]);

  useEffect(() => {
    return () => {
      clearUnlockTimer();
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!displayed || exiting) return;

    const step = (dir: -1 | 1) => {
      if (locked.current || imageCountRef.current === 0 || exitingRef.current) return;
      lock();
      setAnimate(true);
      setTrackPage((p) => p + dir);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [displayed, exiting]);

  if (!displayed) return null;

  const { images } = displayed;

  const pageImages = (pageIndex: number) => {
    if (images.length === 0) return [];
    const start = (pageIndex % pageCount) * PAGE_SIZE;
    return Array.from({ length: Math.min(PAGE_SIZE, images.length) }, (_, i) => {
      return images[(start + i) % images.length];
    });
  };

  const trackPages = [
    pageImages(pageCount - 1),
    ...Array.from({ length: pageCount }, (_, i) => pageImages(i)),
    pageImages(0),
  ];

  const goPrev = () => {
    if (locked.current || images.length === 0 || exiting) return;
    lock();
    setAnimate(true);
    setTrackPage((p) => p - 1);
  };

  const goNext = () => {
    if (locked.current || images.length === 0 || exiting) return;
    lock();
    setAnimate(true);
    setTrackPage((p) => p + 1);
  };

  const onTrackTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== 'transform') return;

    const current = trackPageRef.current;
    const pages = pageCountRef.current;

    if (current === 0) {
      setAnimate(false);
      setTrackPage(pages);
      requestAnimationFrame(() => {
        requestAnimationFrame(unlock);
      });
      return;
    }

    if (current === pages + 1) {
      setAnimate(false);
      setTrackPage(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(unlock);
      });
      return;
    }

    unlock();
  };

  return (
    <div
      data-lenis-prevent
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8${exiting ? ' pointer-events-none' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={displayed.name}
    >
      <button
        type="button"
        aria-label="Close"
        className={`absolute inset-0 bg-black/60 ${exiting ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop-in'}`}
        onClick={requestClose}
      />

      <div
        className={`relative z-10 w-full max-w-5xl max-h-[90svh] overflow-y-auto rounded-2xl bg-white shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          exiting ? 'animate-modal-panel-out' : 'animate-modal-panel-in'
        }`}
      >
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#8b0c0b] shadow hover:bg-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {displayed.coverSrc && (
          <div className="relative w-full aspect-[21/8.1] md:aspect-[2.667/1] bg-neutral-200">
            <Image
              src={displayed.coverSrc}
              alt={`${displayed.name} cover`}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
              priority
            />
            {displayed.description && (
              <>
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <p className="font-charter text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white italic text-center max-w-4xl leading-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]">
                    {displayed.description}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        <h2
          className={`px-6 text-center font-adobe-aldine text-3xl md:text-5xl font-bold text-[#8b0c0b] ${
            displayed.coverSrc ? 'pt-6 pb-2' : 'pt-12 pb-2 pr-14'
          }`}
        >
          {displayed.name}
        </h2>

        <div className="px-4 md:px-8 pb-8 pt-4">
          {images.length === 0 ? (
            <p className="font-archivo-narrow text-center text-[#8b0c0b]">
              No gallery images available yet.
            </p>
          ) : (
            <div className="relative flex items-center gap-2 md:gap-4">
              <button
                type="button"
                onClick={goPrev}
                disabled={isSliding || exiting}
                aria-label="Previous images"
                className="btn-white-to-red shrink-0 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full disabled:pointer-events-none disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex-1 min-w-0 overflow-hidden">
                <div
                  className={`flex ${animate ? 'transition-transform ease-[cubic-bezier(0.22,0.8,0.24,1)]' : ''}`}
                  style={{
                    transform: `translateX(-${trackPage * 100}%)`,
                    transitionDuration: animate ? `${SLIDE_MS}ms` : undefined,
                  }}
                  onTransitionEnd={onTrackTransitionEnd}
                >
                  {trackPages.map((group, pageIndex) => (
                    <div
                      key={`page-${pageIndex}`}
                      className="grid w-full shrink-0 grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
                    >
                      {group.map((image, i) => (
                        <figure key={`${pageIndex}-${i}-${image.src}`} className="min-w-0">
                          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
                            <Image
                              src={image.src}
                              alt={image.label}
                              fill
                              sizes="280px"
                              className="object-cover"
                            />
                          </div>
                          <figcaption className="mt-3 font-archivo-narrow font-semibold text-xs md:text-sm text-center text-[#8b0c0b] uppercase leading-snug">
                            {image.label}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={goNext}
                disabled={isSliding || exiting}
                aria-label="Next images"
                className="btn-white-to-red shrink-0 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full disabled:pointer-events-none disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
