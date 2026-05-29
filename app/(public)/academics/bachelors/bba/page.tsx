import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, CheckCircle, AlertCircle, TrendingUp, Users, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bachelor of Business Administration (BBA)',
  description: 'BBA at EU American University — A comprehensive online undergraduate program developing foundational business skills with a global perspective.',
};

const whatYoullLearn = [
  'Principles of management, organizational behavior, and strategic planning',
  'Financial accounting, managerial finance, and economic analysis',
  'Marketing strategy, consumer behavior, and brand management',
  'Human resource management and leadership development',
  'Entrepreneurship, innovation, and business plan development',
  'Business law, ethics, and corporate governance',
];

const careerOutcomes = ['Business Manager', 'Marketing Coordinator', 'Financial Analyst', 'Operations Supervisor', 'Entrepreneur', 'Project Manager'];

const highlights = [
  { icon: TrendingUp, title: 'Career-Focused Curriculum', description: 'Courses designed with input from industry leaders to ensure real-world relevance.' },
  { icon: Users, title: 'Global Peer Network', description: 'Study alongside professionals from over 100 countries.' },
  { icon: Lightbulb, title: 'Practical Learning', description: 'Case studies, simulations, and capstone projects that mirror real business challenges.' },
];

export default function BBAPage() {
  return (
    <>
      <section className="relative h-[340px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80)' }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-main relative z-10 pb-12">
          <Link href="/academics/bachelors" className="text-sm text-white/70 hover:text-white mb-4 inline-flex items-center gap-1">← Bachelor&apos;s Programs</Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="badge-accent">Bachelor&apos;s Program</span>
            
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white">Bachelor of Business Administration (BBA)</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="section-title mb-6">Program Overview</h2>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            The Bachelor of Business Administration at EU American University provides students with a well-rounded foundation in business principles and management practices. The program integrates theoretical knowledge with practical application, preparing graduates for professional roles across diverse industries.
          </p>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            Students develop critical thinking, analytical reasoning, and communication skills while gaining expertise in key areas including finance, marketing, operations, and human resources. The curriculum is structured to nurture ethical leadership and a global mindset.
          </p>
          <p className="text-foreground-secondary leading-relaxed mb-8">
            Delivered entirely online, the BBA program is designed for students who want a flexible, high-quality undergraduate education that fits around their existing commitments.
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
                  The program name <strong>&quot;Bachelor of Business Administration (BBA)&quot;</strong> is exactly what will be printed on your official certificate.
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
