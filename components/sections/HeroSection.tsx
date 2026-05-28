'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80',
    alt: 'University graduation ceremony',
  },
  {
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1600&q=80',
    alt: 'Modern university campus',
  },
  {
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80',
    alt: 'University library',
  },
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80',
    alt: 'Lecture hall with students',
  },
  {
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80',
    alt: 'Students at commencement',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-[600px] lg:h-[700px] flex items-center overflow-hidden" id="hero-section">
      {/* Background slideshow */}
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            role="img"
            aria-label={heroSlides[currentSlide].alt}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/[0.52]" />

      {/* Content */}
      <div className="container-main relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.15] mb-6 text-balance">
            Shaping Global Leaders.{' '}
            <span className="text-[#C8A951]">Transforming the World.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
            EU American University delivers accessible, high-quality education
            that equips individuals with the knowledge and global perspective
            needed to lead with purpose.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C8A951] hover:bg-[#A88B3A] text-white font-semibold text-base rounded-card transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
              id="hero-apply-btn"
            >
              Apply Now
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/academics"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 text-white font-semibold text-base rounded-card transition-all duration-200 hover:bg-white/10 hover:border-white active:scale-[0.98]"
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
                ? 'bg-[#C8A951] scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
