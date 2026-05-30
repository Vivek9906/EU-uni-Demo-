import { PageHeader } from '@/components/admin/PageHeader';
import { ProgramsClient } from './ProgramsClient';

export default function ProgramsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Programs Management"
        description="Create and manage academic programs, degrees, and honorary awards."
      />
      <ProgramsClient />
    </div>
  );
}
