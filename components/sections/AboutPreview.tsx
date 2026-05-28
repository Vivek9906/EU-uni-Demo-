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
            <span className="section-label">About Us</span>
            <h2 className="section-title">Excellence Rooted in Purpose</h2>
            <p className="text-foreground-secondary leading-relaxed mb-4">
              EU American University is an internationally operating
              institution focused on providing flexible, career-driven academic
              programs. With a European foundation and a U.S. administrative
              presence, we serve students and professionals across multiple
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
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80)' }}
              />
              <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 inline-block">
                      <div className="text-sm font-body uppercase tracking-wider opacity-80">IARC & QAHE Accredited</div>
                    </div>
                    <div className="flex gap-3 justify-center flex-wrap">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-xs font-body">ACBSP Member</div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-xs font-body">IACBE Member</div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-xs font-body">ASIC UK</div>
                    </div>
                    <p className="text-white/60 text-sm max-w-xs mx-auto">
                      Approved distance learning establishment by the French Ministry&apos;s Rector of the Paris Academy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-card shadow-lg border border-border p-4 z-10">
              <div className="text-xl font-heading font-bold text-primary">#1</div>
              <div className="text-xs text-foreground-muted font-body">For Innovation</div>
            </div>

            <div className="absolute top-4 -right-4 bg-white rounded-card shadow-lg border border-border p-4 z-10">
              <div className="text-xl font-heading font-bold text-accent">100+</div>
              <div className="text-xs text-foreground-muted font-body">Countries</div>
            </div>

            <div className="absolute bottom-12 -right-4 bg-white rounded-card shadow-lg border border-border p-4 z-10">
              <div className="text-xl font-heading font-bold text-success">250+</div>
              <div className="text-xs text-foreground-muted font-body">Alumni Network</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
