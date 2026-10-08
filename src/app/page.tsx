'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const carouselImages = [
    '/assets/images/home/main1.jpg',
    '/assets/images/home/main3.jpg',
    '/assets/images/home/main5.jpg',
    '/assets/images/home/main6.jpg',
    '/assets/images/home/main7.jpg',
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen w-full">
        {/* Carousel Images */}
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}

        {/* Content Overlay */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mb-4 leading-tight">
            Makers of exotic & exquisitely hand-crafted natural laminated panels
          </h1>
          <p className="text-2xl md:text-3xl text-white italic mb-8">
            since 1990
          </p>
          <Link
            href="#explore"
            className="text-white font-semibold px-8 py-3 rounded-md text-lg transition-colors duration-200 hover:opacity-90"
            style={{ backgroundColor: '#8b0c0b' }}
          >
            EXPLORE
          </Link>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 right-8 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-transparent'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Collections Section */}
      <section className="relative h-[660px] w-full bg-white">
        <div className="h-full flex flex-col items-center pt-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold" style={{ color: '#8b0c0b' }}>
            Collections
          </h2>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative h-[660px] w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: "url('/assets/images/home/main5.jpg')" }}
        ></div>

        {/* Red Box Overlay (2/5ths width) */}
        <div className="relative h-full flex items-center">
          <div className="w-full md:w-2/5 h-full flex flex-col justify-center px-8 md:px-16 py-12" style={{ backgroundColor: 'rgba(140, 11, 11, 0.85)' }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Us
            </h2>
            <p className="text-white text-base md:text-lg leading-relaxed mb-8">
              TIMBERMATE - HMT INDUSTRIES CORP. is formerly known as HM TRADING, which was founded in 1990 as a trader of raw materials and to support its mother company, Duru's Industries Corp.
            </p>
            <Link
              href="/about"
              className="bg-white hover:bg-gray-100 font-semibold px-8 py-3 rounded-md text-base w-fit transition-colors duration-200"
              style={{ color: '#8b0c0b' }}
            >
              READ MORE
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="relative h-[660px] w-full bg-white">
        {/* Background Image with Border */}
        <div className="absolute inset-8 border-[12px] border-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: "url('/assets/images/home/events.jpg')" }}
          ></div>

          {/* Red Overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(140, 11, 11, 0.85)' }}></div>

          {/* Content - Right Side */}
          <div className="relative h-full flex items-center justify-end px-8 md:px-16">
            <div className="text-right max-w-xl">
              {/* Upcoming Events with Arrow Circle */}
              <div className="flex items-center justify-end gap-4 mb-6">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Upcoming<br />Events
                </h2>
                {/* Arrow Circle */}
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white flex items-center justify-center">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
              {/* See What's New */}
              <Link
                href="/events"
                className="text-xl md:text-2xl text-white font-semibold underline underline-offset-4 decoration-2 hover:text-gray-200 transition-colors"
              >
                SEE WHAT'S NEW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative h-auto w-full bg-white pb-16">
        <div className="h-full flex flex-col items-center pt-16 px-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-16" style={{ color: '#8b0c0b' }}>
            Gallery
          </h2>
          
          {/* Gallery Grid - 2 rows, 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="group relative aspect-[80/99] rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:-translate-y-4"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('/assets/images/gallery/gallery${item}.jpg')`,
                  }}
                >
                  {/* Placeholder background for missing images */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-4xl font-bold">
                      {item}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showrooms Section */}
      <section className="relative h-[660px] w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/images/home/showrooms.jpg')" }}
        ></div>

        {/* Red Box Overlay (2/5ths width) - Right Side */}
        <div className="relative h-full flex items-center justify-end">
          <div className="w-full md:w-2/5 h-full flex flex-col justify-center px-8 md:px-16 py-12 text-right" style={{ backgroundColor: 'rgba(140, 11, 11, 0.85)' }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Showrooms
            </h2>
            <p className="text-white text-xl md:text-2xl mb-8 italic">
              step into our collections
            </p>
            <Link
              href="/showrooms"
              className="bg-white hover:bg-gray-100 font-semibold px-8 py-3 rounded-md text-base w-fit ml-auto transition-colors duration-200"
              style={{ color: '#8b0c0b' }}
            >
              EXPLORE MORE
            </Link>
          </div>
        </div>
      </section>

      {/* Shop Online Section */}
      <section className="relative py-16 w-full bg-white">
        <div className="max-w-7xl mx-auto px-8">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-2" style={{ color: '#8b0c0b' }}>
            SHOP ONLINE
          </h2>
          <div className="w-48 h-1 mx-auto mb-12" style={{ backgroundColor: '#8b0c0b' }}></div>

          {/* Icons Row */}
          <div className="flex items-center justify-center gap-12 md:gap-32 flex-wrap pb-8">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
              <img src="/assets/icons/facebook.png" alt="Facebook" className="w-16 h-16 md:w-20 md:h-20" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
              <img src="/assets/icons/ig.png" alt="Instagram" className="w-16 h-16 md:w-20 md:h-20" />
            </Link>
            <Link href="https://shopee.ph" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
              <img src="/assets/icons/shopee.png" alt="Shopee" className="w-16 h-16 md:w-20 md:h-20" />
            </Link>
            <Link href="https://lazada.com.ph" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
              <img src="/assets/icons/lazada.png" alt="Lazada" className="w-16 h-16 md:w-20 md:h-20" />
            </Link>
            <Link href="https://carousell.ph" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
              <img src="/assets/icons/carousell.png" alt="Carousell" className="w-16 h-16 md:w-20 md:h-20" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12" style={{ backgroundColor: '#8c0b0b' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Column 1: Logo */}
            <div className="flex items-start justify-center md:justify-start">
              <img src="/assets/images/common/footer_logo.png" alt="HMT Footer Logo" className="h-20 w-auto" />
            </div>

            {/* Column 2: Main Menu */}
            <div className="text-white">
              <h3 className="font-bold text-lg mb-4">Main Menu</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:underline transition-colors">Home</Link></li>
                <li><Link href="/panel-collection" className="hover:underline transition-colors">Panel Collection</Link></li>
                <li><Link href="/other-products" className="hover:underline transition-colors">Other Productions</Link></li>
                <li><Link href="/gallery" className="hover:underline transition-colors">Gallery</Link></li>
                <li><Link href="/faqs" className="hover:underline transition-colors">FAQs</Link></li>
                <li><Link href="/distributors" className="hover:underline transition-colors">Distributors</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact Us */}
            <div className="text-white">
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm">
                <p>(02) 8354-5535 | (02) 8967-1968</p>
                <p>Fax No.: (02) 8352-2365</p>
                <p>Email: hmt_mnl@pldtdsl.net</p>
              </div>
              
              {/* Social Icons */}
              <div className="flex gap-4 mt-6">
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
                  <img src="/assets/icons/facebook-footer.png" alt="Facebook" className="w-8 h-8" />
                </Link>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
                  <img src="/assets/icons/instagram-footer.png" alt="Instagram" className="w-8 h-8" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright Section */}
      <section className="w-full py-6 bg-white">
        <div className="w-full px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left: Certification Image */}
            <div>
              <img src="/assets/images/home/cert.png" alt="Certification" className="h-16 w-auto" />
            </div>

            {/* Right: Copyright Text */}
            <div className="text-right text-sm space-y-1" style={{ color: '#8b0c0b' }}>
              <p>Timbermate-HMT Industries Corp.</p>
              <p>All Rights Reserved.</p>
              <p>Copyright 2016-2026.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
