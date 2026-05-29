import type { Metadata } from 'next';
import { Bell, FileText, Calendar } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'Notices', description: 'Official university notices and announcements from EU American University.' };

const notices = [
  { title: 'Fall 2025 Enrollment Now Open', category: 'academic', date: 'May 2025', content: 'Applications for the Fall 2025 semester are now being accepted across all programs.' },
  { title: 'Updated Academic Calendar 2025-2026', category: 'academic', date: 'April 2025', content: 'The academic calendar for 2025-2026 has been published with key dates including Fall semester start on September 15, 2025.' },
  { title: 'Library Database Access Expanded', category: 'admin', date: 'March 2025', content: 'EU American University has expanded digital library resources with access to JSTOR, ProQuest, and Emerald Insight.' },
  { title: 'Commencement 2027 Registration Opens Soon', category: 'general', date: 'March 2025', content: 'Eligible graduates for the Commencement Ceremony 2027 should begin registration. Ceremony scheduled for June 15, 2027.' },
  { title: 'Scholarship Application Deadline Reminder', category: 'academic', date: 'February 2025', content: 'The EUAU Merit Excellence Scholarship deadline is December 31, 2025.' },
];

const categoryColors: Record<string, string> = { academic: 'badge-primary', admin: 'badge-accent', exam: 'badge-error', general: 'badge-success' };

export default function NoticesPage() {
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
                    <div className="flex items-center gap-2 mb-1"><span className={categoryColors[n.category] || 'badge-primary'}>{n.category}</span><span className="text-xs text-foreground-muted flex items-center gap-1"><Calendar size={12} />{n.date}</span></div>
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
