import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, CheckCircle, AlertCircle, Scale, Users, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Master of Public Administration (MPA)',
  description: 'MPA at EU American University — Advance your career in public service with graduate-level expertise in policy analysis and governance.',
};

const whatYoullLearn = [
  'Advanced public policy analysis and program evaluation',
  'Public financial management, budgeting, and resource allocation',
  'Organizational leadership in government and nonprofit sectors',
  'International development and global governance frameworks',
  'Strategic planning for public institutions',
  'Public-private partnerships and collaborative governance',
];

const careerOutcomes = ['Senior Policy Advisor', 'City Administrator', 'International Development Director', 'Government Affairs Director', 'Public Sector Consultant', 'Nonprofit Executive Director'];

const highlights = [
  { icon: Scale, title: 'Policy Mastery', description: 'Advanced frameworks for analyzing and shaping public policy.' },
  { icon: Users, title: 'Leadership in Governance', description: 'Prepare for senior roles in government and international organizations.' },
  { icon: Lightbulb, title: 'Applied Research', description: 'Capstone projects addressing real public administration challenges.' },
];

export default function MPAPage() {
  return (
    <>
      <section className="relative h-[340px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&q=80)' }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-main relative z-10 pb-12">
          <Link href="/academics/masters" className="text-sm text-white/70 hover:text-white mb-4 inline-flex items-center gap-1">← Master&apos;s Programs</Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="badge-accent">Master&apos;s Program</span>
            <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full"><Globe size={12} />Online</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white">Master of Public Administration (MPA)</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="section-title mb-6">Program Overview</h2>
          <p className="text-foreground-secondary leading-relaxed mb-4">The Master of Public Administration at EU American University is designed for professionals who want to lead in government, nonprofit organizations, and international development. This program provides advanced knowledge in policy analysis, public financial management, and organizational leadership.</p>
          <p className="text-foreground-secondary leading-relaxed mb-4">Students examine how public institutions function, how policies are developed and implemented, and how leaders can drive meaningful improvements in public services. The curriculum emphasizes evidence-based decision-making and ethical governance.</p>
          <p className="text-foreground-secondary leading-relaxed mb-8">Delivered fully online, the MPA program is ideal for mid-career professionals in public service who want to advance into senior administrative and policy roles.</p>

          <h2 className="section-title mb-6">What You&apos;ll Learn</h2>
          <div className="card p-6 mb-12"><ul className="space-y-3">{whatYoullLearn.map((item) => (<li key={item} className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />{item}</li>))}</ul></div>

          <h2 className="section-title mb-6">Career Outcomes</h2>
          <div className="flex flex-wrap gap-2 mb-12">{careerOutcomes.map((o) => (<span key={o} className="badge-primary">{o}</span>))}</div>

          <h2 className="section-title mb-6">Admission Requirements</h2>
          <div className="card p-6 mb-12"><ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Recognized bachelor&apos;s degree from an accredited institution</li>
            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Minimum 2 years of professional experience (preferred)</li>
            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Official academic transcripts</li>
            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Current CV/resume and statement of purpose</li>
            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Professional or academic reference</li>
          </ul></div>

          <h2 className="section-title mb-6">Program Highlights</h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">{highlights.map((h) => (<div key={h.title} className="card p-6 text-center"><h.icon className="w-8 h-8 text-primary mx-auto mb-3" /><h3 className="font-heading text-base font-bold mb-2">{h.title}</h3><p className="text-xs text-foreground-secondary">{h.description}</p></div>))}</div>

          <div className="bg-accent/5 border border-accent/20 rounded-card p-6 mb-8"><div className="flex items-start gap-3"><AlertCircle size={20} className="text-accent shrink-0 mt-0.5" /><div><h3 className="font-heading text-base font-bold mb-1">Certificate Note</h3><p className="text-sm text-foreground-secondary">The program name <strong>&quot;Master of Public Administration (MPA)&quot;</strong> is exactly what will be printed on your official certificate.</p></div></div></div>

          <div className="text-center"><Link href="/admissions/apply" className="btn-primary gap-2">Apply Now <ArrowRight size={16} /></Link></div>
        </div>
      </section>
    </>
  );
}
