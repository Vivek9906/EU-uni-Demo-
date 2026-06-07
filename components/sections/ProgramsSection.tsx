'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ProgramLevel = 'bachelors' | 'masters' | 'honorary' | 'phd';

const LEVEL_BADGES: Record<string, string> = {
  bachelors: "Bachelor\u2019s Program",
  masters: "Master\u2019s Program",
  phd: 'PhD Program',
  honorary: 'Honorary Recognition',
};

type ProgramCard = {
  title: string;
  slug: string;
  level: string;
  description: string;
  imageUrl: string | null;
};

type Props = {
  dbPrograms: ProgramCard[];
};

const tabs: { key: ProgramLevel; label: string }[] = [
  { key: 'phd', label: 'PhD' },
  { key: 'honorary', label: 'Honorary' },
  { key: 'masters', label: "Master's" },
  { key: 'bachelors', label: "Bachelor's" },
];

export default function ProgramsSection({ dbPrograms }: Props) {
  const [activeTab, setActiveTab] = useState<ProgramLevel>('phd');

  // Group programs by level
  const programs: Record<ProgramLevel, ProgramCard[]> = {
    phd: dbPrograms.filter(p => p.level === 'phd').slice(0, 3),
    honorary: dbPrograms.filter(p => p.level === 'honorary').slice(0, 3),
    masters: dbPrograms.filter(p => p.level === 'masters').slice(0, 3),
    bachelors: dbPrograms.filter(p => p.level === 'bachelors').slice(0, 3),
  };

  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Explore Programs</span>
            <h2 className="section-title">PhD &bull; Honorary &bull; Master&apos;s &bull; Bachelor&apos;s</h2>
            <p className="section-subtitle mx-auto">
              Discover programs designed to elevate your career and make a global impact.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-background-subtle rounded-card p-1 border border-border">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-2.5 rounded-md text-sm font-body font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-foreground-secondary hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {programs[activeTab].map((program) => (
              <div key={program.slug} className="card overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${program.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80'})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                      {LEVEL_BADGES[program.level] ?? program.level}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                    {program.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                    {program.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/academics/${program.level}/${program.slug}`}
                      className="text-sm font-medium text-primary hover:text-primary-light transition-colors inline-flex items-center gap-1"
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                    <Link
                      href="/admissions/apply"
                      className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-10">
          <Link href="/academics" className="btn-ghost">
            View All Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
