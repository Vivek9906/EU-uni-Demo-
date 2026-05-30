import { PageHeader } from '@/components/admin/PageHeader';
import { GalleryClient } from './GalleryClient';

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gallery Management"
        description="Manage images for the public gallery."
      />
      <GalleryClient />
    </div>
  );
}
