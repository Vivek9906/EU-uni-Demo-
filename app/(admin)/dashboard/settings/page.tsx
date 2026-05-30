import { PageHeader } from '@/components/admin/PageHeader';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage system configurations and preferences"
      />
      <div className="text-sm text-gray-500">
        Settings module is currently under construction.
      </div>
    </div>
  );
}
