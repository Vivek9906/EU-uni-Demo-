import { PageHeader } from '@/components/admin/PageHeader';

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Team"
        description="Manage admin users and roles"
      />
      <div className="text-sm text-gray-500">
        Team module is currently under construction.
      </div>
    </div>
  );
}
