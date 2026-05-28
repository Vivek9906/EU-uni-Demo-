import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, CheckCircle, AlertCircle, Heart, Users, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bachelor of Social Work (BSW)',
  description: 'BSW at EU American University — Develop the skills to support individuals and communities through counseling, advocacy, and social welfare programs.',
};

const whatYoullLearn = [
  'Foundations of social work practice and social welfare history',
  'Human behavior and the social environment across the lifespan',
  'Counseling techniques, crisis intervention, and client assessment',
  'Community organization, advocacy, and social justice principles',
  'Social policy analysis and program evaluation',
  'Cultural competence and ethical practice in diverse settings',
];

const careerOutcomes = ['Social Worker', 'Case Manager', 'Community Outreach Coordinator', 'Youth Services Specialist', 'Family Counselor', 'Nonprofit Program Manager'];

const highlights = [
  { icon: Heart, title: 'Human-Centered Approach', description: 'Learn to support individuals and families through evidence-based practice.' },
  { icon: Users, title: 'Community Impact', description: 'Develop skills to create meaningful change in your community.' },
  { icon: Lightbulb, title: 'Ethical Practice', description: 'Build a strong foundation in social justice, equity, and professional ethics.' },
];

export default function BSWPage() {
  return (
    <>
      <section className="relative h-[340px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80)' }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-main relative z-10 pb-12">
          <Link href="/academics/bachelors" className="text-sm text-white/70 hover:text-white mb-4 inline-flex items-center gap-1">← Bachelor&apos;s Programs</Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="badge-accent">Bachelor&apos;s Program</span>
            <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full"><Globe size={12} />Online</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white">Bachelor of Social Work (BSW)</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="section-title mb-6">Program Overview</h2>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            The Bachelor of Social Work at EU American University prepares compassionate individuals for careers dedicated to helping people overcome challenges and improve their quality of life. This program combines theoretical knowledge with practical skills training in counseling, community development, and social advocacy.
          </p>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            Students gain a deep understanding of human behavior, social systems, and the structural factors that affect well-being. The curriculum emphasizes cultural competence, ethical decision-making, and evidence-based practice, ensuring graduates are prepared to work effectively in diverse settings.
          </p>
          <p className="text-foreground-secondary leading-relaxed mb-8">
            This fully online program is designed for individuals who are passionate about social justice and want the flexibility to study while engaged in community work, volunteering, or other professional commitments.
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
                <p className="text-sm text-foreground-secondary">The program name <strong>&quot;Bachelor of Social Work (BSW)&quot;</strong> is exactly what will be printed on your official certificate.</p>
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
