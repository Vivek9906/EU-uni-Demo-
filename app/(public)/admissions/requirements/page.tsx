import type { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'Admission Requirements', description: 'Entry requirements for EU American University programs including MBA, Honorary Doctorate, and Professorship.' };

const requirements = [
  { level: "Bachelor's — MBA (BBA)", items: ['High school diploma or equivalent', 'Official transcripts', 'Statement of purpose (200–1000 words)', 'Valid passport or national ID', 'Passport-size photograph', 'English proficiency (if applicable)'] },
  { level: "Master's — MBA", items: ["Recognized bachelor's degree", 'Minimum 2 years professional experience (preferred)', 'Official academic transcripts', 'Current CV/resume', 'Statement of purpose (200–1000 words)', 'Professional or academic reference', 'Valid passport or national ID'] },
  { level: 'Honorary Doctorate', items: ['Minimum 10 years of professional leadership', 'Significant contributions to community, education, or industry', 'Recognized standing in profession', 'Commitment to ethical leadership', 'Track record of mentorship or philanthropy', 'Detailed statement of purpose'] },
  { level: 'Honorary Professorship', items: ['Distinguished record of academic or professional achievement', 'Contributions to education, research, or knowledge advancement', 'Recognized expertise through publications or practice', 'Commitment to academic integrity', 'Statement of purpose describing contributions'] },
];

export default function RequirementsPage() {
  return (
    <>
      <PageHero
        title="Admission Requirements"
        subtitle="Detailed entry requirements for each program level at EU American University."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Admission Requirements' }]}
      />
      <section className="section-padding">
        <div className="container-main max-w-4xl space-y-8">
          {requirements.map((req) => (
            <div key={req.level} className="card p-8">
              <h2 className="font-heading text-xl font-bold mb-4 text-primary">{req.level}</h2>
              <ul className="space-y-3">
                {req.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground-secondary">
                    <CheckCircle size={14} className="text-success shrink-0 mt-1" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
