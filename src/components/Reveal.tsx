'use client';

import { useEffect, useRef, useState } from 'react';

type RevealProps = {
  children: React.ReactNode;
  from?: 'up' | 'left' | 'right';
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Reveal({ children, from = 'up', delay = 0, className = '', style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={from}
      data-shown={shown}
      className={`reveal ${className}`}
      style={{ ...style, animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
