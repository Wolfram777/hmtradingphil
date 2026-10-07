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
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-md text-lg transition-colors duration-200"
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
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-600">
            Collections
          </h2>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative h-[660px] w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/images/home/main5-2.jpg')" }}
        ></div>

        {/* Red Box Overlay (2/5ths width) */}
        <div className="relative h-full flex items-center">
          <div className="w-full md:w-2/5 bg-transparent h-full flex flex-col justify-center px-8 md:px-16 py-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Us
            </h2>
            <p className="text-white text-base md:text-lg leading-relaxed mb-8">
              TIMBERMATE - HMT INDUSTRIES CORP. is formerly known as HM TRADING, which was founded in 1990 as a trader of raw materials and to support its mother company, Duru's Industries Corp.
            </p>
            <Link
              href="/about"
              className="bg-white hover:bg-gray-100 text-red-600 font-semibold px-8 py-3 rounded-md text-base w-fit transition-colors duration-200"
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
      <section className="relative h-[1650px] w-full bg-white">
        <div className="h-full flex flex-col items-center pt-16 px-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-600 mb-16">
            Gallery
          </h2>
          
          {/* Gallery Grid - 2 rows, 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="group relative aspect-[8/9] rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:-translate-y-4"
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
    </div>
  );
}
