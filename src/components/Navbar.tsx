'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'PANEL COLLECTION', href: '/panel-collection' },
    { name: 'OTHER PRODUCTS', href: '/other-products' },
    { name: 'GALLERY FAQS', href: '/gallery-faqs' },
    { name: 'DISTRIBUTOR', href: '/distributor' },
    { name: 'CONTACT US', href: '/contact-us' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-transparent border-transparent'
          : 'bg-white border-gray-200'
      }`}
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
              className={`h-12 w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex flex-1 justify-center space-x-8 px-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-sm transition-colors hover:opacity-80"
                style={{ color: '#8b0c0b' }}
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
              className="focus:outline-none transition-colors hover:opacity-80"
              style={{ color: '#8b0c0b' }}
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
