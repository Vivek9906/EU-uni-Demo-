import type { Metadata } from 'next';
import { Bell, FileText, Calendar } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'Notices', description: 'Official university notices and announcements from EU American University.' };
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/db';

const categoryColors: Record<string, string> = { academic: 'badge-primary', admin: 'badge-accent', exam: 'badge-error', general: 'badge-success' };

export default async function NoticesPage() {
  const notices = await prisma.notice.findMany({
    where: { isActive: true },
    orderBy: { postedAt: 'desc' }
  });
  return (
    <>
      <PageHero
        title="Official Notices"
        subtitle="Important announcements from EU American University."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Official Notices' }]}
      />
      <section className="section-padding">
        <div className="container-main max-w-4xl space-y-4">
          {notices.map((n) => (
            <div key={n.title} className="card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 mb-1"><span className={categoryColors[n.category] || 'badge-primary'}>{n.category}</span><span className="text-xs text-foreground-muted flex items-center gap-1"><Calendar size={12} />{n.postedAt.toLocaleDateString()}</span></div>
                    <h3 className="font-heading text-base font-bold mb-1">{n.title}</h3>
                    <p className="text-sm text-foreground-secondary">{n.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
