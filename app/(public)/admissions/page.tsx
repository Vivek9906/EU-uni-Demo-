import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText, Clock, CheckCircle } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Admissions',
  description: 'Learn about the admissions process at EU American University. Application timeline, requirements, and how to apply for MBA, Honorary Doctorate, and Professorship programs.',
};

const steps = [
  { step: '1', title: 'Explore Programs', desc: 'Browse our programs to find the right fit for your career goals and aspirations.', icon: FileText },
  { step: '2', title: 'Check Requirements', desc: 'Review the specific entry requirements for your chosen program level.', icon: CheckCircle },
  { step: '3', title: 'Submit Application', desc: 'Complete our online application form with all required documents.', icon: FileText },
  { step: '4', title: 'Receive Decision', desc: 'Our admissions committee reviews your application and notifies you of the outcome.', icon: Clock },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        title="Your Journey Begins Here"
        subtitle="EU American University operates on a rolling admissions basis. We welcome applications from qualified candidates worldwide. Begin your application today and take the next step in your career."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Your Journey Begins Here' }]}
      />

      <section className="section-padding">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="section-label">Application Process</span>
            <h2 className="section-title">How to Apply</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-lg font-bold">{s.step}</div>
                <h3 className="font-heading text-base font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-foreground-secondary">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(100%+8px)]">
                    <ArrowRight size={16} className="text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background-subtle">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/admissions/requirements" className="card p-6 hover:border-primary/20 group">
              <h3 className="font-heading text-base font-bold group-hover:text-primary transition-colors mb-2">Entry Requirements</h3>
              <p className="text-sm text-foreground-secondary">Detailed requirements for each program level.</p>
              <span className="text-sm text-primary mt-3 inline-flex items-center gap-1">Learn More <ArrowRight size={14} /></span>
            </Link>
            <Link href="/admissions/apply" className="card p-6 hover:border-primary/20 group">
              <h3 className="font-heading text-base font-bold group-hover:text-primary transition-colors mb-2">Apply Now</h3>
              <p className="text-sm text-foreground-secondary">Start your application online today.</p>
              <span className="text-sm text-primary mt-3 inline-flex items-center gap-1">Apply <ArrowRight size={14} /></span>
            </Link>
            <Link href="/admissions/scholarships" className="card p-6 hover:border-primary/20 group">
              <h3 className="font-heading text-base font-bold group-hover:text-primary transition-colors mb-2">Scholarships</h3>
              <p className="text-sm text-foreground-secondary">Merit, need-based, and international scholarships.</p>
              <span className="text-sm text-primary mt-3 inline-flex items-center gap-1">View Options <ArrowRight size={14} /></span>
            </Link>
            <Link href="/admissions/financial-aid" className="card p-6 hover:border-primary/20 group">
              <h3 className="font-heading text-base font-bold group-hover:text-primary transition-colors mb-2">Financial Aid</h3>
              <p className="text-sm text-foreground-secondary">Payment plans and financial assistance.</p>
              <span className="text-sm text-primary mt-3 inline-flex items-center gap-1">Learn More <ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
