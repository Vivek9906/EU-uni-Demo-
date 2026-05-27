import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Events', description: 'Upcoming events, conferences, and ceremonies at AMU.' };

const events = [
  { title: 'AMU Commencement Ceremony 2027', date: 'June 15, 2027', venue: 'AMU Grand Hall, Paris, France', category: 'Ceremony', slug: 'commencement-ceremony-2027', description: 'Celebrate academic achievement at AMU\'s prestigious commencement ceremony honoring all graduates.' },
  { title: 'International Leadership Summit 2025', date: 'September 20-21, 2025', venue: 'AMU Conference Center, Paris', category: 'Conference', slug: 'international-leadership-summit-2025', description: 'A two-day summit bringing together thought leaders to explore the future of leadership.' },
];

export default function EventsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main"><span className="section-label">Events</span><h1 className="text-4xl font-heading font-bold mb-4">Events & Conferences</h1><p className="text-lg text-foreground-secondary">Stay connected with AMU through our academic events and ceremonies.</p></div>
      </section>
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((e) => (
              <div key={e.slug} className="card p-6 hover:border-primary/20">
                <span className="badge-primary mb-3">{e.category}</span>
                <h2 className="font-heading text-xl font-bold mb-2">{e.title}</h2>
                <p className="text-sm text-foreground-secondary mb-4">{e.description}</p>
                <div className="space-y-2 mb-4"><div className="flex items-center gap-2 text-sm text-foreground-muted"><Calendar size={14} />{e.date}</div><div className="flex items-center gap-2 text-sm text-foreground-muted"><MapPin size={14} />{e.venue}</div></div>
                <Link href={`/events/${e.slug}`} className="text-sm font-semibold text-primary inline-flex items-center gap-1">View Details <ArrowRight size={14} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
