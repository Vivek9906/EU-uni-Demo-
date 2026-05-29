import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, DollarSign } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'Scholarships', description: 'Merit-based, need-based, and international scholarships at AMU.' };

const scholarships = [
  { name: 'AMU Merit Excellence Scholarship', type: 'Merit-Based', amount: 'Up to 50% tuition reduction', eligibility: 'Outstanding academic records (GPA 3.5+), leadership, community involvement.', deadline: 'December 31, 2025' },
  { name: 'Global Leaders Financial Aid Grant', type: 'Need-Based', amount: 'Up to 40% tuition assistance', eligibility: 'Students from developing nations or demonstrating financial need.', deadline: 'November 30, 2025' },
  { name: 'International Diversity Scholarship', type: 'International', amount: 'Up to 30% tuition reduction', eligibility: 'International students from underrepresented regions.', deadline: 'March 31, 2026' },
];

export default function ScholarshipsPage() {
  return (
    <>
      <PageHero
        title="Scholarships"
        subtitle="AMU offers multiple scholarship opportunities to make quality education accessible."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Scholarships' }]}
      />
      <section className="section-padding">
        <div className="container-main max-w-4xl space-y-6">
          {scholarships.map((s) => (
            <div key={s.name} className="card p-8">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className="badge-accent mb-2">{s.type}</span>
                  <h2 className="font-heading text-xl font-bold mb-2">{s.name}</h2>
                  <div className="flex items-center gap-2 text-accent font-semibold mb-3"><DollarSign size={16} />{s.amount}</div>
                  <p className="text-sm text-foreground-secondary mb-2"><strong>Eligibility:</strong> {s.eligibility}</p>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted"><Calendar size={14} />Deadline: {s.deadline}</div>
                </div>
                <Link href="/admissions/apply" className="btn-primary btn-sm gap-1 shrink-0">Apply <ArrowRight size={14} /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
