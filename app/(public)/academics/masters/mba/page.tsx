import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, CheckCircle, AlertCircle, TrendingUp, Users, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Master of Business Administration (MBA)',
  description: 'MBA at EU American University — An advanced online graduate program for ambitious professionals seeking senior leadership positions.',
};

const whatYoullLearn = [
  'Strategic leadership and executive management principles',
  'Financial management, corporate finance, and investment analysis',
  'Global business strategy and international market dynamics',
  'Digital transformation, innovation management, and technology leadership',
  'Business ethics, corporate governance, and sustainability',
  'Entrepreneurship, venture development, and business model innovation',
];

const careerOutcomes = ['Chief Executive Officer', 'Managing Director', 'Strategy Consultant', 'VP of Operations', 'Chief Marketing Officer', 'Chief Financial Officer'];

const highlights = [
  { icon: TrendingUp, title: 'Executive-Level Curriculum', description: 'Case studies and simulations from leading global organizations.' },
  { icon: Users, title: 'Global Peer Network', description: 'Learn alongside experienced professionals from 100+ countries.' },
  { icon: Lightbulb, title: 'Capstone Research', description: 'Apply strategic thinking to a real-world business challenge.' },
];

export default function MBAPage() {
  return (
    <>
      <section className="relative h-[340px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80)' }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-main relative z-10 pb-12">
          <Link href="/academics/masters" className="text-sm text-white/70 hover:text-white mb-4 inline-flex items-center gap-1">← Master&apos;s Programs</Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="badge-accent">Master&apos;s Program</span>
            
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white">Master of Business Administration (MBA)</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="section-title mb-6">Program Overview</h2>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            The MBA at EU American University is designed for professionals who aspire to lead organizations at the highest level. Our curriculum combines rigorous academic theory with practical executive education, emphasizing strategic leadership, innovation, and global business perspectives.
          </p>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            Students engage with case studies from leading global organizations, participate in executive seminars, and develop a comprehensive capstone project that demonstrates their ability to apply strategic thinking to real-world business challenges.
          </p>
          <p className="text-foreground-secondary leading-relaxed mb-8">
            Delivered entirely online, the MBA program is built for working professionals who want to accelerate their careers without stepping away from their current roles.
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
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Recognized bachelor&apos;s degree from an accredited institution</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Minimum 2 years of professional experience (preferred)</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Official academic transcripts</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Current CV/resume</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Statement of purpose (200–1000 words)</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Professional or academic reference</li>
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
                <p className="text-sm text-foreground-secondary">The program name <strong>&quot;Master of Business Administration (MBA)&quot;</strong> is exactly what will be printed on your official certificate.</p>
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
