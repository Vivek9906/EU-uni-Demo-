'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export interface TestimonialItem {
  id?: string;
  name: string;
  program: string;
  content: string;
}

export default function TestimonialsCarousel({ testimonials }: { testimonials: TestimonialItem[] }) {
  if (!testimonials || testimonials.length === 0) return null;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((i) => (i + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  const prev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  // Get 3 visible cards based on currentIndex
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return items;
  };

  const visible = getVisibleTestimonials();

  return (
    <section className="testimonials-section">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="section-label">Student Voices</span>
          <h2 className="section-title">What Our Graduates Say</h2>
          <p className="section-subtitle mx-auto">
            Hear from professionals, leaders, and innovators who chose EU American University
            to shape their careers and legacies.
          </p>
        </div>

        {/* Carousel track */}
        <div className="testimonials-viewport">
          <div
            className="testimonials-track"
            style={{
              transition: isAnimating ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
          >
            {visible.map((t, i) => (
              <div key={`${currentIndex}-${i}`} className="testimonial-card">
                <Quote style={{ color: '#E09900', width: 32, height: 32, marginBottom: 16 }} />
                <p className="testimonial-text">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.program}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="testimonials-controls">
          <button onClick={prev} className="carousel-btn" aria-label="Previous testimonial">
            <ChevronLeft size={20} />
          </button>
          <div className="carousel-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  setIsAnimating(true);
                  setCurrentIndex(i);
                  setTimeout(() => setIsAnimating(false), 400);
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="carousel-btn" aria-label="Next testimonial">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
