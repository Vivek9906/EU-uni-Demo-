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
            {/* Decorative gold accent border */}
            <div className="absolute -top-3 -right-3 w-full h-full border-[3px] border-[#E09900] rounded-2xl z-0 hidden lg:block" />

            <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=85"
                alt="Professional university lecture at EU American University"
                className="w-full h-[480px] object-cover"
              />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-card shadow-lg border border-border p-4 z-20">
              <div className="text-xl font-bold text-[#1B3A6B]">#1</div>
              <div className="text-xs text-foreground-muted">For Innovation</div>
            </div>

            <div className="absolute top-4 -right-4 bg-white rounded-card shadow-lg border border-border p-4 z-20 hidden lg:block">
              <div className="text-xl font-bold text-[#E09900]">100+</div>
              <div className="text-xs text-foreground-muted">Countries</div>
            </div>

            <div className="absolute bottom-12 -right-4 bg-white rounded-card shadow-lg border border-border p-4 z-20 hidden lg:block">
              <div className="text-xl font-bold text-success">250+</div>
              <div className="text-xs text-foreground-muted">Alumni Network</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
