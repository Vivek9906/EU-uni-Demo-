import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, CheckCircle, AlertCircle, Heart, Users, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Master of Social Work (MSW)',
  description: 'MSW at EU American University — Deepen your expertise in clinical practice, community organization, and social policy.',
};

const whatYoullLearn = [
  'Advanced clinical social work practice and therapeutic modalities',
  'Community organization, macro-level intervention, and program design',
  'Social policy analysis, legislative advocacy, and systems change',
  'Advanced research methods for social work practice',
  'Supervision, leadership, and management in social service agencies',
  'Trauma-informed care, crisis intervention, and resilience building',
];

const careerOutcomes = ['Clinical Social Worker', 'Licensed Therapist', 'Social Services Director', 'Policy Advocate', 'Hospital Social Worker', 'School Social Worker'];

const highlights = [
  { icon: Heart, title: 'Clinical Excellence', description: 'Advanced training in therapeutic practice and client assessment.' },
  { icon: Users, title: 'Community Leadership', description: 'Design and lead social programs that create lasting change.' },
  { icon: Lightbulb, title: 'Research-Informed', description: 'Apply evidence-based methods to social work challenges.' },
];

export default function MSWPage() {
  return (
    <>
      <section className="relative h-[340px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80)' }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-main relative z-10 pb-12">
          <Link href="/academics/masters" className="text-sm text-white/70 hover:text-white mb-4 inline-flex items-center gap-1">← Master&apos;s Programs</Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="badge-accent">Master&apos;s Program</span>
            
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white">Master of Social Work (MSW)</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="section-title mb-6">Program Overview</h2>
          <p className="text-foreground-secondary leading-relaxed mb-4">The Master of Social Work at EU American University prepares graduates for advanced practice in clinical social work, community leadership, and policy advocacy. This program builds on foundational social work knowledge to develop specialized skills in assessment, intervention, and program management.</p>
          <p className="text-foreground-secondary leading-relaxed mb-4">Students deepen their understanding of human behavior, social systems, and evidence-based therapeutic approaches. The curriculum emphasizes both micro-level clinical skills and macro-level systems thinking, preparing graduates to address complex social challenges at individual and community levels.</p>
          <p className="text-foreground-secondary leading-relaxed mb-8">Delivered fully online, the MSW is designed for working professionals and aspiring social workers who want to advance their careers while maintaining their current commitments.</p>

          <h2 className="section-title mb-6">What You&apos;ll Learn</h2>
          <div className="card p-6 mb-12"><ul className="space-y-3">{whatYoullLearn.map((item) => (<li key={item} className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />{item}</li>))}</ul></div>

          <h2 className="section-title mb-6">Career Outcomes</h2>
          <div className="flex flex-wrap gap-2 mb-12">{careerOutcomes.map((o) => (<span key={o} className="badge-primary">{o}</span>))}</div>

          <h2 className="section-title mb-6">Admission Requirements</h2>
          <div className="card p-6 mb-12"><ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Recognized bachelor&apos;s degree from an accredited institution</li>
            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Minimum 2 years of professional or volunteer experience in social services (preferred)</li>
            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Official academic transcripts</li>
            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Current CV/resume and statement of purpose</li>
            <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Professional or academic reference</li>
          </ul></div>

          <h2 className="section-title mb-6">Program Highlights</h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">{highlights.map((h) => (<div key={h.title} className="card p-6 text-center"><h.icon className="w-8 h-8 text-primary mx-auto mb-3" /><h3 className="font-heading text-base font-bold mb-2">{h.title}</h3><p className="text-xs text-foreground-secondary">{h.description}</p></div>))}</div>

          <div className="bg-accent/5 border border-accent/20 rounded-card p-6 mb-8"><div className="flex items-start gap-3"><AlertCircle size={20} className="text-accent shrink-0 mt-0.5" /><div><h3 className="font-heading text-base font-bold mb-1">Certificate Note</h3><p className="text-sm text-foreground-secondary">The program name <strong>&quot;Master of Social Work (MSW)&quot;</strong> is exactly what will be printed on your official certificate.</p></div></div></div>

          <div className="text-center"><Link href="/admissions/apply" className="btn-primary gap-2">Apply Now <ArrowRight size={16} /></Link></div>
        </div>
      </section>
    </>
  );
}
