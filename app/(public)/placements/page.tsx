import type { Metadata } from 'next';
import { Briefcase, TrendingUp, Building2 } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'Placements', description: 'Career placement statistics, top recruiters, and success stories at EU American University.' };

const stats = [{ value: '95%', label: 'Employment Rate' }, { value: '120+', label: 'Recruiting Partners' }, { value: '50+', label: 'Countries Placed' }];
const recruiters = ['McKinsey & Company', 'Deloitte', 'Google', 'KPMG', 'World Bank', 'United Nations', 'PwC', 'Ernst & Young', 'Goldman Sachs', 'Amazon', 'Microsoft', 'Accenture'];

export default function PlacementsPage() {
  return (
    <>
      <PageHero
        title="Career Placements"
        subtitle="EU American University graduates are employed at leading organizations worldwide."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Career Placements' }]}
      />
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stats.map((s) => (<div key={s.label} className="card p-6 text-center"><div className="text-3xl font-heading font-bold text-primary mb-1">{s.value}</div><div className="text-sm text-foreground-muted">{s.label}</div></div>))}
          </div>
          <h2 className="section-title mb-6 text-center">Top Recruiters</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {recruiters.map((r) => (<div key={r} className="px-6 py-3 bg-background-subtle border border-border rounded-card text-sm font-medium text-foreground-secondary">{r}</div>))}
          </div>
        </div>
      </section>
    </>
  );
}
