import type { Metadata } from 'next';
import { Award, Shield, CheckCircle } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'Accreditation', description: 'AMU accreditations, memberships, and quality assurance credentials.' };

const accreditations = [
  { name: 'IARC', fullName: 'International Accreditation & Recognition Council', desc: 'IARC accreditation validates AMU\'s commitment to quality education standards and continuous improvement.' },
  { name: 'QAHE', fullName: 'Quality Assurance in Higher Education', desc: 'QAHE accreditation ensures AMU meets international benchmarks for higher education quality.' },
  { name: 'ACBSP', fullName: 'Accreditation Council for Business Schools & Programs', desc: 'ACBSP membership recognizes AMU\'s business programs for teaching excellence and student outcomes.' },
  { name: 'IACBE', fullName: 'International Accreditation Council for Business Education', desc: 'IACBE membership affirms the quality of AMU\'s business education programs globally.' },
  { name: 'ASIC UK', fullName: 'Accreditation Service for International Schools, Colleges & Universities', desc: 'ASIC UK membership validates AMU\'s operations against UK quality standards for international education.' },
  { name: 'French Ministry', fullName: 'Approved by the French Ministry\'s Rector of the Paris Academy', desc: 'Official approval as a distance learning establishment by the French education authority.' },
];

export default function AccreditationPage() {
  return (
    <>
      <PageHero
        title="Accreditation & Memberships"
        subtitle="AMU maintains the highest standards through internationally recognized accreditations."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Accreditation & Memberships' }]}
      />
      <section className="section-padding">
        <div className="container-main max-w-4xl space-y-6">
          {accreditations.map((a) => (
            <div key={a.name} className="card p-6 flex items-start gap-4">
              <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center shrink-0"><span className="text-xs font-accent font-bold text-primary">{a.name}</span></div>
              <div><h3 className="font-heading text-base font-bold mb-1">{a.fullName}</h3><p className="text-sm text-foreground-secondary">{a.desc}</p></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
