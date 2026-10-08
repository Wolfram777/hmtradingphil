'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const BRAND_RED = '#8b0c0b';
const NAV_HEIGHT = 80; // matches h-20
const DARK_SECTIONS = new Set(['hero', 'about', 'events', 'showrooms', 'footer']);

const navItems = [
  { name: 'PANEL COLLECTION', href: '/panel-collection' },
  { name: 'OTHER PRODUCTS', href: '/other-products' },
  { name: 'GALLERY', href: '/gallery' },
  { name: 'FAQS', href: '/faqs' },
  { name: 'DISTRIBUTORS', href: '/distributors' },
  { name: 'CONTACT US', href: '/contact-us' },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-section-id]')
    );
    const probeY = NAV_HEIGHT / 2; // vertical centre of the navbar
    let frame = 0;

    const update = () => {
      frame = 0;
      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= probeY && bottom > probeY) {
          setIsDark(DARK_SECTIONS.has(section.dataset.sectionId ?? ''));
          return;
        }
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const navStyle = {
    '--nav-text': isDark ? '#ffffff' : BRAND_RED,
    '--nav-hover-bg': isDark ? BRAND_RED : '#ffffff',
    '--nav-hover-ring': isDark ? 'transparent' : BRAND_RED,
  } as React.CSSProperties;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
      style={navStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/assets/images/common/hmt_logo.png"
              alt="HMT Logo"
              width={120}
              height={48}
              priority
              className={`h-12 w-auto object-contain transition-[filter] duration-300 ${
                isDark ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex flex-1 justify-center space-x-6 px-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-archivo-narrow font-semibold text-sm px-3 py-2 rounded text-[var(--nav-text)] transition-[color,background-color,box-shadow,transform] duration-300 hover:scale-105 hover:bg-[var(--nav-hover-bg)] hover:shadow-[0_0_0_1px_var(--nav-hover-ring)]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Spacer for balance */}
          <div className="flex-shrink-0 w-[120px] hidden md:block"></div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="focus:outline-none text-[var(--nav-text)] transition-colors duration-300 hover:opacity-80"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
