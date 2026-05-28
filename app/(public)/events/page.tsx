import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Calendar, MapPin, ArrowRight, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events at EU American University.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function EventsPage({ searchParams }: { searchParams: { tab?: string } }) {
  const activeTab = searchParams.tab === 'past' ? 'past' : 'upcoming';
  const now = new Date();

  // Fetch events based on tab
  const events = await prisma.event.findMany({
    where: {
      isPublished: true,
      ...(activeTab === 'upcoming' ? { date: { gte: now } } : { date: { lt: now } })
    },
    orderBy: {
      date: activeTab === 'upcoming' ? 'asc' : 'desc'
    },
    take: 10
  });

  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main">
          <div className="max-w-3xl">
            <span className="section-label">University Life</span>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Events & Conferences
            </h1>
            <p className="text-lg text-foreground-secondary leading-relaxed">
              Join the EU American University community at our global events, conferences, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          {/* Tabs */}
          <div className="flex mb-10 border-b border-border">
            <Link 
              href="/events?tab=upcoming" 
              className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === 'upcoming' ? 'text-primary' : 'text-foreground-secondary hover:text-primary'}`}
            >
              Upcoming Events
              {activeTab === 'upcoming' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </Link>
            <Link 
              href="/events?tab=past" 
              className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === 'past' ? 'text-primary' : 'text-foreground-secondary hover:text-primary'}`}
            >
              Past Events
              {activeTab === 'past' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white border border-border rounded-xl shadow-sm overflow-hidden group flex flex-col">
                {event.imageUrl && (
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${event.imageUrl})` }} />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                      {event.category}
                    </div>
                  </div>
                )}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h2 className="font-heading text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                  </h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                      <Calendar size={16} className="text-primary/70 shrink-0" />
                      <span>
                        {format(new Date(event.date), 'MMMM d, yyyy')}
                        {event.endDate && ` - ${format(new Date(event.endDate), 'MMMM d, yyyy')}`}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                      <Clock size={16} className="text-primary/70 shrink-0" />
                      <span>
                        {format(new Date(event.date), 'h:mm a')}
                        {event.endDate && ` - ${format(new Date(event.endDate), 'h:mm a')}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                      <MapPin size={16} className="text-primary/70 shrink-0" />
                      <span>{event.venue}</span>
                    </div>
                    
                    {event.attendees && (
                      <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                        <Users size={16} className="text-primary/70 shrink-0" />
                        <span>{event.attendees} Attendees</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-foreground-secondary leading-relaxed mb-6 flex-1">
                    {event.description}
                  </p>

                  <div className="mt-auto">
                    {activeTab === 'upcoming' ? (
                      <button className="btn-primary w-full sm:w-auto">Register Now</button>
                    ) : (
                      <button className="btn-ghost w-full sm:w-auto text-xs py-2 px-4">View Recap</button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {events.length === 0 && (
              <div className="col-span-2 text-center py-12 bg-background-subtle rounded-xl border border-border">
                <Calendar size={48} className="text-foreground-muted mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">No events found</h3>
                <p className="text-foreground-secondary">Check back later for {activeTab} events.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
