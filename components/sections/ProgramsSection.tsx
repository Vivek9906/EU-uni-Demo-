'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ProgramLevel = 'bachelors' | 'masters' | 'phd';

const programs = {
  bachelors: [
    {
      name: 'Bachelor of Business Administration (BBA)',
      description: 'A comprehensive undergraduate program developing foundational business skills in management, finance, marketing, and entrepreneurship with a global perspective.',
      href: '/academics/bachelors',
    },
  ],
  masters: [
    {
      name: 'Master of Business Administration (MBA)',
      description: 'An advanced graduate program for aspiring leaders, combining strategic management, global business strategy, and practical leadership development.',
      href: '/academics/masters',
    },
  ],
  phd: [
    {
      name: 'Honorary Doctorate (Honoris Causa)',
      description: 'A prestigious recognition for individuals who have demonstrated exceptional leadership and made significant contributions to their field and society.',
      href: '/academics/phd',
    },
    {
      name: 'Honorary Professorship',
      description: 'An academic distinction recognizing outstanding contributions to education, research, or professional excellence at the highest level.',
      href: '/academics/phd',
    },
  ],
};

const tabs: { key: ProgramLevel; label: string }[] = [
  { key: 'bachelors', label: "Bachelor's" },
  { key: 'masters', label: "Master's (MBA)" },
  { key: 'phd', label: 'PhD' },
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
            <h2 className="section-title">Bachelor&apos;s • Master&apos;s • PhD</h2>
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
                className={`px-6 py-2.5 rounded-md text-sm font-accent font-medium transition-all ${
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

        {/* Program cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {programs[activeTab].map((program) => (
              <div
                key={program.name}
                className="card p-6 hover:border-primary/20 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                      {program.description}
                    </p>
                    <Link
                      href={program.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-light transition-colors"
                    >
                      Explore
                      <ArrowRight size={14} />
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
