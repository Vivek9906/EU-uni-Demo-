'use client';

import { motion } from 'framer-motion';
import { BookOpen, Award, Lightbulb, Users } from 'lucide-react';

const pillars = [
  {
    icon: BookOpen,
    title: 'World-Class Academics',
    description:
      'Rigorous programs designed by industry experts, combining academic theory with practical application for real-world impact.',
  },
  {
    icon: Award,
    title: 'Global Recognition',
    description:
      'Internationally accredited institution with IARC, QAHE, ACBSP, IACBE, and ASIC UK memberships ensuring worldwide credential recognition.',
  },
  {
    icon: Lightbulb,
    title: 'Innovative Research',
    description:
      'Research initiatives across multiple disciplines, driving knowledge creation and addressing global challenges in business and society.',
  },
  {
    icon: Users,
    title: 'Global Community',
    description:
      'A diverse community of students and alumni from 100+ countries creating a rich multicultural learning environment.',
  },
];

export default function WhyAMU() {
  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Why Choose EU American University</span>
            <h2 className="section-title">Four Pillars of Excellence</h2>
            <p className="section-subtitle mx-auto">
              Discover what makes EU American University a leader in
              global education.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="card p-6 text-center group hover:border-primary/20"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                <pillar.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
