import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, CheckCircle, AlertCircle, Scale, Users, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bachelor of Public Administration (BPA)',
  description: 'BPA at EU American University — Prepare for leadership roles in government, public policy, and nonprofit organizations through our online undergraduate program.',
};

const whatYoullLearn = [
  'Foundations of public administration and governance structures',
  'Public policy analysis, formulation, and evaluation',
  'Government budgeting, public finance, and fiscal management',
  'Ethics in public service and accountability frameworks',
  'Nonprofit management and community engagement strategies',
  'Administrative law and regulatory compliance',
];

const careerOutcomes = ['Public Administrator', 'Policy Analyst', 'Government Relations Officer', 'Nonprofit Program Director', 'City Manager', 'Legislative Aide'];

const highlights = [
  { icon: Scale, title: 'Policy-Driven Learning', description: 'Analyze real-world policies and develop actionable solutions for public challenges.' },
  { icon: Users, title: 'Civic Leadership Focus', description: 'Prepare to lead in government, nonprofits, and international organizations.' },
  { icon: Lightbulb, title: 'Evidence-Based Approach', description: 'Apply research methodology and data analysis to public decision-making.' },
];

export default function BPAPage() {
  return (
    <>
      <section className="relative h-[340px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&q=80)' }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-main relative z-10 pb-12">
          <Link href="/academics/bachelors" className="text-sm text-white/70 hover:text-white mb-4 inline-flex items-center gap-1">← Bachelor&apos;s Programs</Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="badge-accent">Bachelor&apos;s Program</span>
            
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white">Bachelor of Public Administration (BPA)</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="section-title mb-6">Program Overview</h2>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            The Bachelor of Public Administration at EU American University prepares students for meaningful careers in government, public policy, and nonprofit leadership. This program provides a strong grounding in how public institutions operate and how policy decisions shape communities.
          </p>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            Students explore the principles of governance, public finance, administrative law, and ethical leadership. Through case-based learning and practical exercises, graduates gain the skills needed to manage public organizations, design effective policies, and serve their communities with integrity.
          </p>
          <p className="text-foreground-secondary leading-relaxed mb-8">
            Delivered fully online, the BPA program is ideal for individuals who are passionate about public service and want the flexibility to study while working or volunteering in their communities.
          </p>

          <h2 className="section-title mb-6">What You&apos;ll Learn</h2>
          <div className="card p-6 mb-12">
            <ul className="space-y-3">
              {whatYoullLearn.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />{item}</li>
              ))}
            </ul>
          </div>

          <h2 className="section-title mb-6">Career Outcomes</h2>
          <div className="flex flex-wrap gap-2 mb-12">
            {careerOutcomes.map((o) => (<span key={o} className="badge-primary">{o}</span>))}
          </div>

          <h2 className="section-title mb-6">Admission Requirements</h2>
          <div className="card p-6 mb-12">
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />High school diploma or equivalent qualification</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Official transcripts from previous education</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Statement of purpose (200–1000 words)</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Valid passport or national ID</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Recent passport-size photograph</li>
            </ul>
          </div>

          <h2 className="section-title mb-6">Program Highlights</h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {highlights.map((h) => (
              <div key={h.title} className="card p-6 text-center">
                <h.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading text-base font-bold mb-2">{h.title}</h3>
                <p className="text-xs text-foreground-secondary">{h.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-card p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading text-base font-bold mb-1">Certificate Note</h3>
                <p className="text-sm text-foreground-secondary">The program name <strong>&quot;Bachelor of Public Administration (BPA)&quot;</strong> is exactly what will be printed on your official certificate.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/admissions/apply" className="btn-primary gap-2">Apply Now <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
