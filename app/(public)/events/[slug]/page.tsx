import Link from 'next/link';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  return (
    <section className="section-padding">
      <div className="container-main max-w-3xl">
        <Link href="/events" className="text-sm text-primary hover:text-primary-light mb-6 inline-flex items-center gap-1"><ArrowLeft size={14} /> Back to Events</Link>
        <span className="badge-primary mb-4 block w-fit">Event</span>
        <h1 className="text-3xl font-heading font-bold mb-4">Event Details</h1>
        <p className="text-foreground-secondary mb-6">Event information for: {params.slug}</p>
        <div className="card p-6">
          <div className="space-y-3"><div className="flex items-center gap-2 text-sm text-foreground-muted"><Calendar size={14} />Date to be confirmed</div><div className="flex items-center gap-2 text-sm text-foreground-muted"><MapPin size={14} />Venue to be confirmed</div></div>
        </div>
      </div>
    </section>
  );
}
