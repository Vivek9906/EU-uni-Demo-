'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=90',
    title: 'Shaping Global Leaders.',
    subtitle: 'Transforming the World.',
  },
  {
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1920&q=90',
    title: 'A Legacy of Excellence.',
    subtitle: 'Since 1924.',
  },
  {
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1920&q=90',
    title: 'Learn Without Limits.',
    subtitle: 'Study Online, Lead Globally.',
  },
  {
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1920&q=90',
    title: 'Knowledge. Purpose. Impact.',
    subtitle: 'EU American University.',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <section
      className="relative h-[600px] lg:h-[700px] flex items-center overflow-hidden"
      id="hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background slideshow — crossfade */}
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            role="img"
            aria-label={heroSlides[currentSlide].title}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navy-tinted dark overlay + gradient */}
      <div className="absolute inset-0 bg-[rgba(10,20,45,0.58)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,20,45,0.75)] via-transparent to-transparent" />

      {/* Content */}
      <div className="container-main relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto"
        >
          {/* Gold label */}
          <div className="inline-block mb-6 px-4 py-1.5 border border-white/20 rounded-full">
            <span className="text-[#E09900] text-xs font-bold tracking-[0.15em] uppercase">
              EST. 1924 · GLOBALLY ACCREDITED
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-white leading-[1.15] mb-6 text-balance">
            {heroSlides[0].title}{' '}
            <span className="text-[#E09900] italic">
              {heroSlides[0].subtitle}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
            EU American University — where purpose meets possibility.
            Join a global community of leaders across 100+ countries.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E09900] hover:bg-[#B87C00] text-white font-bold text-base rounded-card transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
              id="hero-apply-btn"
            >
              Apply Now
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/academics"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 text-white font-bold text-base rounded-card transition-all duration-200 hover:bg-white/10 hover:border-white hover:-translate-y-0.5 active:scale-[0.98]"
              id="hero-explore-btn"
            >
              Explore Programs
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#E09900] scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
