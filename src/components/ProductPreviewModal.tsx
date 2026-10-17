'use client';

import LoadingImage from '@/components/LoadingImage';
import { useEffect, useRef, useState } from 'react';

export type ProductPreview = {
  id: string;
  name: string;
  src: string;
};

type ProductPreviewModalProps = {
  product: ProductPreview | null;
  onClose: () => void;
};

const EXIT_MS = 600;

export default function ProductPreviewModal({ product, onClose }: ProductPreviewModalProps) {
  const [displayed, setDisplayed] = useState<ProductPreview | null>(product);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCloseRef = useRef(onClose);
  const exitingRef = useRef(false);

  onCloseRef.current = onClose;
  exitingRef.current = exiting;

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
    if (product) {
      if (exitTimer.current) {
        clearTimeout(exitTimer.current);
        exitTimer.current = null;
      }
      setDisplayed(product);
      setExiting(false);
    }
  }, [product]);

  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!displayed || exiting) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
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
        className={`relative z-10 w-full max-w-3xl max-h-[90svh] overflow-hidden rounded-2xl bg-white shadow-2xl ${
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

        <div className="relative w-full aspect-square bg-neutral-100">
          <LoadingImage
            src={displayed.src}
            alt={displayed.name}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-contain p-4 md:p-8 pt-14 md:pt-16"
            priority
          />
          <h2 className="absolute inset-x-0 top-0 z-10 px-12 pt-5 md:pt-6 text-center font-archivo-narrow font-semibold text-[#8b0c0b] text-lg md:text-2xl leading-snug">
            {displayed.name}
          </h2>
        </div>
      </div>
    </div>
  );
}
