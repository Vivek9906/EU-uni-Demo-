'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPreview() {
  return (
    <section className="section-padding bg-background-subtle">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">About AMU</span>
            <h2 className="section-title">Excellence Rooted in Purpose</h2>
            <p className="text-foreground-secondary leading-relaxed mb-4">
              American Management University is an internationally operating
              institution focused on providing flexible, career-driven academic
              programs. With a European foundation and a U.S. administrative
              presence, AMU serves students and professionals across multiple
              regions.
            </p>
            <p className="text-foreground-secondary leading-relaxed mb-8">
              Our programs are designed to balance academic rigor with practical
              application, allowing learners to advance their careers without
              disrupting their professional lives. We believe in empowering
              individuals from all backgrounds to become ethical leaders.
            </p>
            <Link href="/about" className="btn-primary gap-2">
              Learn More About Us
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">
                    Since 1924
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    A century of shaping global leaders
                  </p>
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-card shadow-lg border border-border p-4 z-10">
              <div className="text-xl font-heading font-bold text-primary">#1</div>
              <div className="text-xs text-foreground-muted font-accent">For Innovation</div>
            </div>

            <div className="absolute top-4 -right-4 bg-white rounded-card shadow-lg border border-border p-4 z-10">
              <div className="text-xl font-heading font-bold text-accent">100+</div>
              <div className="text-xs text-foreground-muted font-accent">Countries</div>
            </div>

            <div className="absolute bottom-12 -right-4 bg-white rounded-card shadow-lg border border-border p-4 z-10">
              <div className="text-xl font-heading font-bold text-success">250+</div>
              <div className="text-xs text-foreground-muted font-accent">Alumni Network</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
