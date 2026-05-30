import { PageHeader } from '@/components/admin/PageHeader';
import { TestimonialsClient } from './TestimonialsClient';

export default function TestimonialsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonials Management"
        description="Review, approve, and manage student testimonials for the public website."
      />
      <TestimonialsClient />
    </div>
  );
}
