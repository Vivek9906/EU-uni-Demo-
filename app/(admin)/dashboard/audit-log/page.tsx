import { PageHeader } from '@/components/admin/PageHeader';

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Log"
        description="View system activity logs"
      />
      <div className="text-sm text-gray-500">
        Audit Log module is currently under construction.
      </div>
    </div>
  );
}
