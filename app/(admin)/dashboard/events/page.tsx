import { PageHeader } from '@/components/admin/PageHeader';
import { EventsClient } from './EventsClient';

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Events & Media"
        description="Manage university events, webinars, conferences, and their associated media assets."
      />
      <EventsClient />
    </div>
  );
}
