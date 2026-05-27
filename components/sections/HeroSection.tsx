'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Award } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-white to-accent/5">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A3C6E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      {/* Slide indicator */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-10">
        {['01', '02', '03', '04'].map((num, i) => (
          <button
            key={num}
            className={`text-xs font-accent font-medium transition-all ${
              i === 0 ? 'text-primary scale-110' : 'text-foreground-muted/40 hover:text-foreground-muted'
            }`}
            aria-label={`Slide ${num}`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 mb-6 shadow-sm"
            >
              <Award size={16} className="text-accent" />
              <span className="text-xs font-accent font-medium text-foreground-secondary">
                A Legacy of Excellence | Est. 1924
              </span>
            </motion.div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-foreground leading-[1.15] mb-6 text-balance">
              Shaping Global Leaders.{' '}
              <span className="text-primary">Transforming the World.</span>
            </h1>

            <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-lg">
              American Management University — A legacy of academic excellence,
              innovation, and global impact since 1924.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/admissions/apply" className="btn-primary gap-2 text-base px-8 py-4">
                Apply Now
                <ArrowRight size={18} />
              </Link>
              <Link href="/academics" className="btn-ghost text-base px-8 py-4">
                Explore Programs
              </Link>
            </div>
          </motion.div>

          {/* Right side decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <GraduationCapIcon className="w-20 h-20 mx-auto mb-4 opacity-20" />
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 inline-block">
                      <div className="text-sm font-accent uppercase tracking-wider opacity-80">IARC & QAHE Accredited</div>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-xs font-accent">ACBSP Member</div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-xs font-accent">IACBE Member</div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-xs font-accent">ASIC UK</div>
                    </div>
                    <p className="text-white/60 text-sm max-w-xs mx-auto">
                      Approved distance learning establishment by the French Ministry&apos;s Rector of the Paris Academy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stats cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-card shadow-lg border border-border p-4"
            >
              <div className="text-2xl font-heading font-bold text-primary">#1</div>
              <div className="text-xs text-foreground-muted font-accent">For Innovation</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-4 -right-4 bg-white rounded-card shadow-lg border border-border p-4"
            >
              <div className="text-2xl font-heading font-bold text-accent">100+</div>
              <div className="text-xs text-foreground-muted font-accent">Countries</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
