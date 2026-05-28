'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';

type ProgramLevel = 'bachelors' | 'masters' | 'honorary';

const programs = {
  bachelors: [
    {
      name: 'Bachelor of Business Administration (BBA)',
      description: 'Build foundational business skills in management, finance, marketing, and entrepreneurship with a global perspective.',
      href: '/academics/bachelors/bba',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    },
    {
      name: 'Bachelor of Public Administration (BPA)',
      description: 'Prepare for leadership roles in government and nonprofit organizations through the study of public policy, governance, and civic leadership.',
      href: '/academics/bachelors/bpa',
      imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
    },
    {
      name: 'Bachelor of Social Work (BSW)',
      description: 'Develop the skills needed to support individuals and communities through counseling, advocacy, and social welfare programs.',
      href: '/academics/bachelors/bsw',
      imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
    },
  ],
  masters: [
    {
      name: 'Master of Business Administration (MBA)',
      description: 'An advanced program for professionals seeking senior leadership positions through strategic thinking and executive decision-making.',
      href: '/academics/masters/mba',
      imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
    },
    {
      name: 'Master of Public Administration (MPA)',
      description: 'Advance your career in public service with graduate-level expertise in policy analysis, organizational management, and governance.',
      href: '/academics/masters/mpa',
      imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
    },
    {
      name: 'Master of Social Work (MSW)',
      description: 'Deepen your expertise in clinical practice, community organization, and social policy to make a meaningful impact on society.',
      href: '/academics/masters/msw',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    },
  ],
  honorary: [
    {
      name: 'Honorary Doctorate (Honoris Causa)',
      description: 'A prestigious recognition for individuals who have demonstrated exceptional leadership and contributions to their field.',
      href: '/academics/honorary',
      imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
    },
    {
      name: 'Doctor of Philosophy (PhD)',
      description: 'An honorary recognition awarded to distinguished scholars whose contributions have significantly advanced their field of expertise.',
      href: '/academics/honorary',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    },
    {
      name: 'Honorary Professorship',
      description: 'An academic distinction recognizing outstanding contributions to education, research, or professional excellence.',
      href: '/academics/honorary',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    },
  ],
};

const tabs: { key: ProgramLevel; label: string }[] = [
  { key: 'bachelors', label: "Bachelor's" },
  { key: 'masters', label: "Master's" },
  { key: 'honorary', label: 'Honorary' },
];

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState<ProgramLevel>('bachelors');

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
            <h2 className="section-title">Bachelor&apos;s • Master&apos;s • Honorary</h2>
            <p className="section-subtitle mx-auto">
              Discover programs designed to elevate your career and make a global
              impact.
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
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

        {/* Program cards with image tiles */}
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
              <div
                key={program.name}
                className="card overflow-hidden group"
              >
                {/* Image tile */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${program.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                      <Globe size={12} />
                      Online
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                    {program.name}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                    {program.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href={program.href}
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
