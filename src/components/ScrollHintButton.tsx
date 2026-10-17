'use client';

import { useEffect, useState } from 'react';

type ScrollHintButtonProps = {
  targetId: string;
  className?: string;
};

export default function ScrollHintButton({
  targetId,
  className = 'bottom-8 md:bottom-10',
}: ScrollHintButtonProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY <= 8);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }}
      aria-label="Scroll down"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`absolute left-1/2 z-20 -translate-x-1/2 transition-opacity duration-500 ease-out ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${className}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8b0c0b] text-white shadow-[0_8px_22px_rgba(139,12,11,0.45)] animate-scroll-hint-bob">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </button>
  );
}
