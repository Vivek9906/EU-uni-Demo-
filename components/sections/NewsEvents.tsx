'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Tag } from 'lucide-react';

const newsItems = [
  {
    date: 'March 15, 2025',
    category: 'Partnerships',
    title: 'EU American University Launches New Partnership with European Business Schools Network',
    excerpt: 'EU American University partners with EBSN to offer expanded international opportunities for students and faculty.',
    slug: 'euau-european-partnership-2025',
  },
  {
    date: 'February 20, 2025',
    category: 'Rankings',
    title: 'EU American University Ranked Among Top 10 for Management Programs in Europe',
    excerpt: "EU American University earns a place among Europe's top 10 institutions for management and leadership education.",
    slug: 'euau-top-10-management-ranking',
  },
  {
    date: 'January 10, 2025',
    category: 'Awards',
    title: 'Honorary Doctorate Recipients Make Global Impact in 2025',
    excerpt: "EU American University's 2025 Honorary Doctorate recipients demonstrate the program's global reach and impact.",
    slug: 'honorary-doctorate-global-impact-2025',
  },
];

const upcomingEvent = {
  date: 'June 15, 2027',
  title: 'EUAU Commencement Ceremony 2027',
  venue: 'EU American Grand Hall, Paris, France',
  slug: 'commencement-ceremony-2027',
};

export default function NewsEvents() {
  return (
    <section className="section-padding bg-background-subtle">
      <div className="container-main">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">News & Events</span>
            <h2 className="section-title">Stay Informed</h2>
            <p className="section-subtitle mx-auto">
              The latest news, events, and updates from EU American
              University.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* News cards */}
          {newsItems.map((item, index) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 hover:border-primary/20 group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-primary">{item.category}</span>
              </div>
              <h3 className="font-heading text-base font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-foreground-secondary mb-4 line-clamp-2">
                {item.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-muted">{item.date}</span>
                <Link
                  href={`/news/${item.slug}`}
                  className="text-xs font-semibold text-primary hover:text-primary-light inline-flex items-center gap-1"
                >
                  READ MORE
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.article>
          ))}

          {/* Upcoming event */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-primary text-white rounded-card p-6"
          >
            <span className="text-xs font-accent font-semibold tracking-wider uppercase text-accent">
              Upcoming Event
            </span>
            <h3 className="font-heading text-lg font-bold text-slate-50 mt-3 mb-4">
              {upcomingEvent.title}
            </h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Calendar size={14} />
                {upcomingEvent.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <MapPin size={14} />
                {upcomingEvent.venue}
              </div>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/20 rounded-card px-4 py-2 hover:bg-white/10 transition-colors"
            >
              View All Events
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
