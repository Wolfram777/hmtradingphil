'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CollectionsCarousel from '@/components/CollectionsCarousel';
import Reveal from '@/components/Reveal';

const galleryItems = [
  { name: 'Manila Fame', file: 'manila fame.jpg' },
  { name: 'Worldbex', file: 'worldbex.jpg' },
  { name: 'Interior & Design Manila', file: 'interior design manila.jpg' },
  { name: 'Hotel Show', file: 'hotel show.jpg' },
  { name: 'Philippine School of Interior Design', file: 'philippines school of interior design.jpg' },
  { name: 'Client Projects', file: 'client projects.jpg' },
];

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

  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const updateGalleryIndex = () => {
    const track = galleryRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    Array.from(track.children).forEach((child, index) => {
      const el = child as HTMLElement;
      const best = track.children[closest] as HTMLElement;
      if (Math.abs(el.offsetLeft + el.offsetWidth / 2 - center) < Math.abs(best.offsetLeft + best.offsetWidth / 2 - center)) {
        closest = index;
      }
    });
    setGalleryIndex(closest);
  };

  const scrollGalleryTo = (index: number) => {
    const track = galleryRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section with Carousel */}
      <section className="relative h-svh w-full" data-section-id="hero">
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
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <Reveal>
            <h1 className="font-charter text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-5xl mb-4 leading-tight">
              Makers of exotic &<br className="hidden sm:inline" />{' '}
              exquisitely hand-crafted<br className="hidden sm:inline" />{' '}
              natural laminated panels
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <p className="font-charter text-2xl sm:text-3xl md:text-5xl text-white italic mb-10 md:mb-16">
              since 1990
            </p>
          </Reveal>
          <Reveal delay={500} className="flex">
            <Link
              href="#explore"
              className="btn-red-to-white font-archivo-narrow font-semibold px-12 md:px-16 py-3 rounded-md text-lg animate-pulse-scale"
            >
              EXPLORE
            </Link>
          </Reveal>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-8 md:right-8 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-transparent'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="relative md:h-[660px] w-full bg-white" data-section-id="collections">
        <div className="md:h-full flex flex-col items-center pt-16 pb-12 md:pb-8 overflow-hidden">
          <Reveal>
            <h2 className="font-adobe-aldine text-5xl md:text-6xl lg:text-7xl font-bold" style={{ color: '#8b0c0b' }}>
              Featured Collections
            </h2>
          </Reveal>
          <Reveal delay={200} className="w-full flex-1 flex mt-10 md:mt-0">
            <CollectionsCarousel />
          </Reveal>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative md:h-[660px] w-full pt-56 sm:pt-72 md:pt-0" data-section-id="about">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: "url('/assets/images/home/main5.jpg')" }}
        ></div>

        {/* Red Box Overlay (2/5ths width) */}
        <div className="relative md:h-full flex items-center">
          <Reveal from="left" className="w-full md:w-3/5 lg:w-2/5 lg:min-w-[480px] md:h-full flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-14 md:py-12" style={{ backgroundColor: 'rgba(140, 11, 11, 0.85)' }}>
            <h2 className="font-charter text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              About Us
            </h2>
            <p className="font-archivo-narrow text-white text-lg md:text-xl lg:text-2xl leading-relaxed mb-8">
              TIMBERMATE - HMT INDUSTRIES CORP.<br className="hidden lg:inline" />{' '}
              is formerly known as HM TRADING, which<br className="hidden lg:inline" />{' '}
              was founded in 1990 as a trader of raw<br className="hidden lg:inline" />{' '}
              materials and to support its mother<br className="hidden lg:inline" />{' '}
              company, Duru's Industries Corp.
            </p>
            <Link
              href="/about"
              className="btn-white-to-red font-archivo-narrow font-semibold px-12 py-3 rounded-md text-base w-fit"
            >
              READ MORE
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="relative h-[520px] md:h-[660px] w-full bg-white" data-section-id="events">
        {/* Background Image with Border */}
        <div className="absolute inset-4 md:inset-8 border-8 md:border-[12px] border-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: "url('/assets/images/home/events.jpg')" }}
          ></div>

          {/* Red Overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(140, 11, 11, 0.85)' }}></div>

          {/* Content - Right Side with Left-Aligned Text */}
          <div className="relative h-full flex items-center justify-center md:justify-end px-6 md:px-16">
            <Reveal from="right" className="text-left max-w-xl">
              {/* Upcoming Events with Arrow Circle */}
              <h2 className="font-adobe-aldine text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
                Upcoming<br />
                Events
                {/* Absolutely positioned svg keeps the circle free of line boxes, so its bottom edge sits on the text baseline */}
                <Link
                  href="/events"
                  aria-label="See upcoming events"
                  className="group relative inline-block align-baseline ml-[0.2em] size-[0.68em] rounded-full border-2 border-white transition-colors duration-300 hover:bg-white"
                >
                  <svg
                    className="absolute inset-0 m-auto size-1/2 text-white group-hover:text-[#8b0c0b] transition-colors duration-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </h2>
              {/* See What's New */}
              <Link
                href="/events"
                className="font-archivo-narrow text-lg md:text-2xl text-white font-semibold underline underline-offset-4 decoration-2 hover:text-gray-200 transition-colors"
              >
                SEE WHAT'S NEW
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative h-auto w-full bg-white pb-16" data-section-id="gallery">
        <div className="h-full flex flex-col items-center pt-16 px-5 sm:px-8">
          <Reveal>
            <h2 className="font-adobe-aldine text-5xl md:text-6xl lg:text-7xl font-bold mb-10 md:mb-16" style={{ color: '#8b0c0b' }}>
              Gallery
            </h2>
          </Reveal>
          
          {/* Gallery - swipeable row on mobile, 2 rows x 3 columns grid from sm up */}
          <div
            ref={galleryRef}
            onScroll={updateGalleryIndex}
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-7xl w-[calc(100%+2.5rem)] sm:w-full -mx-5 sm:mx-0 px-[10%] sm:px-0 pt-2 pb-10 sm:p-0 overflow-x-auto sm:overflow-visible snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {galleryItems.map((item, index) => (
              <Reveal key={item.name} delay={(index % 3) * 150} className="shrink-0 w-full sm:w-auto snap-center">
                <div
                  className="group relative aspect-[80/99] rounded-2xl overflow-hidden bg-neutral-900 shadow-[0_24px_40px_-8px_rgba(0,0,0,0.55)] cursor-pointer transition-transform duration-300 hover:-translate-y-4"
                >
                  <Image
                    src={encodeURI(`/assets/images/gallery/${item.file}`)}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover scale-[1.02]"
                  />
                  <div className="absolute inset-x-0 bottom-0 px-5 pb-5 md:px-6 md:pb-6">
                    <p className="font-archivo-narrow font-semibold text-white text-left text-2xl md:text-3xl lg:text-4xl [text-shadow:0_2px_10px_rgba(0,0,0,0.85)] underline decoration-2 underline-offset-4 decoration-transparent group-hover:decoration-white transition-[text-decoration-color] duration-300">
                      {item.name}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex sm:hidden gap-3">
            {galleryItems.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => scrollGalleryTo(index)}
                aria-label={`Show ${item.name}`}
                className={`h-2.5 rounded-full border-2 border-[#8b0c0b] transition-all duration-300 ${
                  index === galleryIndex ? 'w-6 bg-[#8b0c0b]' : 'w-2.5 bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Showrooms Section */}
      <section className="relative md:h-[660px] w-full pt-56 sm:pt-72 md:pt-0" data-section-id="showrooms">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/images/home/showrooms.jpg')" }}
        ></div>

        {/* Red Box Overlay (2/5ths width) - Right Side */}
        <div className="relative md:h-full flex items-center justify-end">
          <Reveal from="right" className="w-full md:w-3/5 lg:w-2/5 lg:min-w-[480px] md:h-full flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-14 md:py-12 text-right" style={{ backgroundColor: 'rgba(140, 11, 11, 0.85)' }}>
            <h2 className="font-charter text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Showrooms
            </h2>
            <p className="font-archivo-narrow text-white text-xl md:text-2xl lg:text-3xl mb-8">
              Step into our collections today.
            </p>
            <Link
              href="/showrooms"
              className="btn-white-to-red font-archivo-narrow font-semibold px-12 py-3 rounded-md text-base w-fit ml-auto"
            >
              EXPLORE MORE
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Shop Online Section */}
      <section className="relative py-16 md:py-32 w-full bg-white" data-section-id="shop">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Heading */}
          <Reveal>
            <h2 className="font-archivo-narrow text-4xl md:text-5xl font-bold text-center w-fit mx-auto pb-2 mb-10 md:mb-16 border-b-2 border-[#8b0c0b]" style={{ color: '#8b0c0b' }}>
              SHOP ONLINE
            </h2>
          </Reveal>

          {/* Icons Row */}
          <Reveal delay={200} className="flex items-center justify-center gap-x-10 gap-y-8 sm:gap-12 md:gap-20 lg:gap-32 flex-wrap pb-8">
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
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12" style={{ backgroundColor: '#8c0b0b' }} data-section-id="footer">
        <div className="w-full px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Column 1: Logo */}
            <Reveal className="flex flex-col items-start gap-6">
              <img src="/assets/images/common/footer_logo.png" alt="HMT Footer Logo" className="h-20 w-auto" />
              {/* Margins and width crop the source image down to just the three badges */}
              <div className="relative w-64 aspect-[44/15] overflow-hidden rounded-lg bg-white shadow-[0_10px_24px_-6px_rgba(0,0,0,0.45)] ring-1 ring-white/40">
                <img
                  src={encodeURI('/assets/images/common/bir registration sealed badge.jpg')}
                  alt="BIR Registration Seal Badge"
                  className="max-w-none w-[155%] -ml-[27.3%] -mt-[28%]"
                />
              </div>
            </Reveal>

            {/* Column 2: Main Menu */}
            <Reveal delay={150} className="font-archivo-narrow text-white">
              <h3 className="font-bold text-xl mb-4">Main Menu</h3>
              <ul className="space-y-2 text-lg">
                <li><Link href="/" className="hover:underline transition-colors">Home</Link></li>
                <li><Link href="/panel-collection" className="hover:underline transition-colors">Panel Collection</Link></li>
                <li><Link href="/other-products" className="hover:underline transition-colors">Other Productions</Link></li>
                <li><Link href="/gallery" className="hover:underline transition-colors">Gallery</Link></li>
                <li><Link href="/faqs" className="hover:underline transition-colors">FAQs</Link></li>
                <li><Link href="/distributors" className="hover:underline transition-colors">Distributors</Link></li>
              </ul>
            </Reveal>

            {/* Column 3: Contact Us */}
            <Reveal delay={300} className="font-archivo-narrow text-white">
              <h3 className="font-bold text-xl mb-4">Contact Us</h3>
              <div className="space-y-2 text-base">
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
            </Reveal>
          </div>
        </div>
      </footer>

      {/* Copyright Section */}
      <section className="w-full py-6 bg-white" data-section-id="copyright">
        <div className="w-full px-4 md:px-8">
          <Reveal className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left: Certification Image */}
            <div>
              <img src="/assets/images/home/cert.png" alt="Certification" className="h-16 w-auto" />
            </div>

            {/* Right: Copyright Text */}
            <div className="text-center md:text-right text-sm space-y-1" style={{ color: '#8b0c0b' }}>
              <p>Timbermate-HMT Industries Corp.</p>
              <p>All Rights Reserved.</p>
              <p>Copyright 2016-2026.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
