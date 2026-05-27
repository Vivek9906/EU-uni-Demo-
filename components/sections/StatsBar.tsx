'use client';

import { motion } from 'framer-motion';
import { Users, Globe, BookOpen, Briefcase, FlaskConical, Handshake } from 'lucide-react';

const stats = [
  { icon: Users, value: '15,000+', label: 'Students Enrolled' },
  { icon: Globe, value: '100+', label: 'Countries Represented' },
  { icon: BookOpen, value: '200+', label: 'Faculty Members' },
  { icon: Briefcase, value: '95%', label: 'Graduate Employment' },
  { icon: FlaskConical, value: '50+', label: 'Research Centers' },
  { icon: Handshake, value: '120+', label: 'Global Partners' },
];

export default function StatsBar() {
  return (
    <section className="bg-background-subtle border-y border-border">
      <div className="container-main py-10 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 text-primary/40 mx-auto mb-2" />
              <div className="text-2xl lg:text-3xl font-heading font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-xs font-accent text-foreground-muted mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
