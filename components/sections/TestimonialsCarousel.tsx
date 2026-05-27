'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. James Okoye',
    program: 'Honorary Doctorate in Business Leadership',
    content: "Receiving the Honorary Doctorate from American Management University was a defining moment in my career. The recognition validated decades of work in community development across West Africa.",
  },
  {
    name: 'Maria Fernandez',
    program: 'Master of Business Administration (MBA)',
    content: "The MBA program at AMU transformed my approach to business leadership. The flexible online format allowed me to continue working while pursuing my degree.",
  },
  {
    name: 'Prof. Ahmed Al-Rashid',
    program: 'Honorary Professorship',
    content: "Being awarded an Honorary Professorship by AMU was an incredible honor that recognized my contributions to education in the Middle East.",
  },
];

export default function TestimonialsCarousel() {
  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Student Voices</span>
            <h2 className="section-title">What Our Graduates Say</h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="card p-6"
            >
              <Quote className="w-8 h-8 text-accent/30 mb-4" />
              <p className="text-sm text-foreground-secondary leading-relaxed mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-foreground-muted">
                      {testimonial.program}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
