import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, CheckCircle, AlertCircle, TrendingUp, Users, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bachelor of Arts in English Language (BAEL)',
  description: 'BAEL at EU American University — A comprehensive online undergraduate program developing advanced communication, literature, and linguistic skills.',
};

const whatYoullLearn = [
  'Advanced English linguistics and phonetics',
  'Classic and contemporary literature analysis',
  'Professional writing and communication strategies',
  'Cultural studies and global perspectives',
  'Language acquisition and teaching methodologies',
  'Critical thinking and literary theory',
];

const careerOutcomes = ['Writer / Editor', 'Public Relations Specialist', 'Educator', 'Communications Manager', 'Content Strategist', 'Journalist'];

const highlights = [
  { icon: TrendingUp, title: 'Career-Focused Curriculum', description: 'Courses designed to build practical communication skills for the modern workplace.' },
  { icon: Users, title: 'Global Peer Network', description: 'Study alongside professionals from over 100 countries.' },
  { icon: Lightbulb, title: 'Practical Learning', description: 'Writing portfolios, literary analysis, and real-world communication projects.' },
];

export default function BAELPage() {
  return (
    <>
      <section className="relative h-[340px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&q=80)' }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-main relative z-10 pb-12">
          <Link href="/academics/bachelors" className="text-sm text-white/70 hover:text-white mb-4 inline-flex items-center gap-1">← Bachelor&apos;s Programs</Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="badge-accent">Bachelor&apos;s Program</span>
            
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white">Bachelor of Arts in English Language (BAEL)</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="section-title mb-6">Program Overview</h2>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            The Bachelor of Arts in English Language (BAEL) at EU American University provides students with a profound understanding of literature, linguistics, and professional communication. The program is designed for individuals seeking to master the English language while exploring its cultural and historical contexts.
          </p>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            Students develop exceptional writing, critical reading, and analytical skills. The curriculum covers a wide array of topics, from classic literature to modern communication strategies, preparing graduates for diverse roles in education, media, corporate communications, and beyond.
          </p>
          <p className="text-foreground-secondary leading-relaxed mb-8">
            Delivered entirely online, the BAEL program is designed for students who want a flexible, high-quality undergraduate education that fits around their existing commitments.
          </p>

          <h2 className="section-title mb-6">What You&apos;ll Learn</h2>
          <div className="card p-6 mb-12">
            <ul className="space-y-3">
              {whatYoullLearn.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground-secondary">
                  <CheckCircle size={14} className="text-success shrink-0 mt-1" />{item}
                </li>
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
                <p className="text-sm text-foreground-secondary">
                  The program name <strong>&quot;Bachelor of Arts in English Language (BAEL)&quot;</strong> is exactly what will be printed on your official certificate.
                </p>
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
