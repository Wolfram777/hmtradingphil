'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const BRAND_RED = '#8b0c0b';
const NAV_HEIGHT = 80; // matches h-20
const DARK_SECTIONS = new Set(['hero', 'about', 'events', 'showrooms', 'footer']);

type NavItem = {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
};

const slug = (name: string) =>
  name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const withChildren = (base: string, names: string[]) =>
  names.map((name) => ({ name, href: `${base}/${slug(name)}` }));

const navItems: NavItem[] = [
  {
    name: 'PANEL COLLECTION',
    href: '/panel-collection',
    children: withChildren('/panel-collection', ['NATURAL LAMINATED PANELS', 'WOVEN MATTINGS']),
  },
  {
    name: 'OTHER PRODUCTS',
    href: '/other-products',
    children: withChildren('/other-products', [
      'ADHESIVES CHEMICALS',
      'DESSICANT',
      'ELECTRICAL FITTINGS',
      'FABRICS',
      'FILLERS',
      'SCRAPERS & GLUE SPREADER',
      'NAILS',
    ]),
  },
  { name: 'GALLERY', href: '/gallery' },
  { name: 'FAQS', href: '/faqs' },
  { name: 'DISTRIBUTORS', href: '/distributors' },
  { name: 'CONTACT US', href: '/contact-us' },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPointerType = useRef<string>('');

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const openOnHover = (name: string, e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    cancelClose();
    setOpenDropdown(name);
  };

  const closeOnLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('resize', closeOnDesktop);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener('resize', closeOnDesktop);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!openDropdown) return;
    const closeOnOutsideClick = (e: MouseEvent) => {
      if (!desktopNavRef.current?.contains(e.target as Node)) setOpenDropdown(null);
    };
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };
    // Smooth scrolling keeps emitting tiny scroll events after the wheel stops, so only a real scroll closes the menu.
    const openedAt = window.scrollY;
    const closeOnScroll = () => {
      if (Math.abs(window.scrollY - openedAt) > 40) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('scroll', closeOnScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('scroll', closeOnScroll);
    };
  }, [openDropdown]);

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

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileExpanded(null);
  };

  const light = isDark || menuOpen;
  const navStyle = {
    '--nav-text': light ? '#ffffff' : BRAND_RED,
    '--nav-hover-bg': light ? BRAND_RED : '#ffffff',
    '--nav-hover-ring': light ? 'transparent' : BRAND_RED,
    '--dd-bg': light ? BRAND_RED : '#ffffff',
    '--dd-text': light ? '#ffffff' : BRAND_RED,
  } as React.CSSProperties;

  const containerClass = (active = false) =>
    `group transition-[background-color,box-shadow,border-radius] duration-300 hover:bg-[var(--nav-hover-bg)] ${
      active ? 'rounded-t bg-[var(--nav-hover-bg)]' : 'rounded hover:shadow-[0_0_0_1px_var(--nav-hover-ring)]'
    }`;
  const triggerClass =
    'block lg:px-4 xl:px-6 py-2 font-archivo-narrow font-semibold text-sm text-[var(--nav-text)] transition-colors duration-300 cursor-pointer';
  const underline = (active: boolean) =>
    `relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-current after:origin-left after:transition-[scale] after:duration-300 group-hover:after:scale-x-100 ${
      active ? 'after:scale-x-100' : 'after:scale-x-0'
    }`;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
      style={navStyle}
    >
      {/* Mobile menu overlay */}
      <div
        data-lenis-prevent
        className={`lg:hidden fixed inset-0 overflow-y-auto transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: BRAND_RED }}
        aria-hidden={!menuOpen}
      >
        <div className="min-h-full flex flex-col items-center justify-center gap-1 px-6 py-24">
          {navItems.map((item, index) => {
            const expanded = mobileExpanded === item.name;
            const itemClass = `flex items-center gap-2 font-archivo-narrow font-semibold text-2xl sm:text-3xl tracking-wide text-white px-6 py-3 transition-[opacity,translate] duration-500 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`;
            const itemStyle = { transitionDelay: menuOpen ? `${100 + index * 60}ms` : '0ms' };

            if (!item.children) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  tabIndex={menuOpen ? 0 : -1}
                  className={itemClass}
                  style={itemStyle}
                >
                  {item.name}
                </Link>
              );
            }

            return (
              <div key={item.name} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setMobileExpanded(expanded ? null : item.name)}
                  tabIndex={menuOpen ? 0 : -1}
                  aria-expanded={expanded}
                  className={itemClass}
                  style={itemStyle}
                >
                  {item.name}
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden flex flex-col items-center">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={closeMobileMenu}
                        tabIndex={menuOpen && expanded ? 0 : -1}
                        className="font-archivo-narrow font-semibold text-base sm:text-lg tracking-wide text-white/80 hover:text-white px-4 py-1.5 text-center"
                      >
                        {child.name}
                      </Link>
                    ))}
                    <div className="h-2" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" onClick={closeMobileMenu} className="flex items-center flex-shrink-0">
            <Image
              src="/assets/images/common/hmt_logo.png"
              alt="HMT Logo"
              width={120}
              height={48}
              priority
              className={`h-10 md:h-12 w-auto object-contain transition-[filter] duration-300 ${
                light ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* Navigation Links - Centered */}
          <div ref={desktopNavRef} className="hidden lg:flex flex-1 justify-center px-8">
            {navItems.map((item) => {
              if (!item.children) {
                return (
                  <div key={item.name} className={containerClass()}>
                    <Link href={item.href} className={triggerClass}>
                      <span className={underline(false)}>{item.name}</span>
                    </Link>
                  </div>
                );
              }

              const open = openDropdown === item.name;
              return (
                <div
                  key={item.name}
                  className="relative"
                  onPointerEnter={(e) => openOnHover(item.name, e)}
                  onPointerLeave={closeOnLeave}
                >
                  <div className={containerClass(open)}>
                    <button
                      type="button"
                      onPointerDown={(e) => {
                        lastPointerType.current = e.pointerType;
                      }}
                      onClick={() => {
                        // A mouse already opened it on hover, so clicking shouldn't toggle it shut
                        if (lastPointerType.current === 'mouse') setOpenDropdown(item.name);
                        else setOpenDropdown(open ? null : item.name);
                        lastPointerType.current = '';
                      }}
                      aria-expanded={open}
                      aria-haspopup="true"
                      className={triggerClass}
                    >
                      <span className={underline(open)}>{item.name}</span>
                    </button>
                  </div>

                  <div
                    className={`absolute left-0 top-full min-w-[240px] origin-top rounded-b-lg rounded-tr-lg bg-[var(--dd-bg)] py-2 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.45)] transition-[opacity,translate,scale,visibility,background-color] duration-200 ease-out ${
                      open ? 'visible opacity-100 translate-y-0 scale-100' : 'invisible opacity-0 -translate-y-2 scale-95'
                    }`}
                  >
                    {item.children.map((child, index) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        tabIndex={open ? 0 : -1}
                        className={`block whitespace-nowrap px-5 py-2.5 font-archivo-narrow font-semibold text-sm tracking-wide text-[var(--dd-text)] hover:bg-[var(--dd-text)] hover:text-[var(--dd-bg)] ${
                          open ? 'animate-[dropdown-item-in_0.28s_ease-out_both]' : ''
                        }`}
                        style={{ animationDelay: open ? `${60 + index * 45}ms` : undefined }}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spacer for balance */}
          <div className="flex-shrink-0 w-[120px] hidden lg:block"></div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => (menuOpen ? closeMobileMenu() : setMenuOpen(true))}
              className="p-2 -mr-2 focus:outline-none text-[var(--nav-text)] transition-colors duration-300 hover:opacity-80"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
