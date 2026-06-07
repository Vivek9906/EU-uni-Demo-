import Link from 'next/link';
import { ArrowRight, CheckCircle, AlertCircle, TrendingUp, Users, Lightbulb } from 'lucide-react';

const LEVEL_LABELS: Record<string, string> = {
  bachelors: "Bachelor's Program",
  masters: "Master's Program",
  phd: 'PhD Program',
  honorary: 'Honorary Recognition',
};

const LEVEL_BACK_LABELS: Record<string, string> = {
  bachelors: "Bachelor's Programs",
  masters: "Master's Programs",
  phd: 'PhD Programs',
  honorary: 'Honorary Programs',
};

const highlights = [
  { icon: TrendingUp, title: 'Career-Focused Curriculum', description: 'Courses designed with input from industry leaders to ensure real-world relevance.' },
  { icon: Users, title: 'Global Peer Network', description: 'Study alongside professionals from over 100 countries.' },
  { icon: Lightbulb, title: 'Practical Learning', description: 'Real-world projects and case studies that mirror professional challenges.' },
];

type Props = {
  program: {
    title: string;
    slug: string;
    level: string;
    description: string;
    imageUrl: string | null;
  };
};

export default function DynamicProgramPage({ program }: Props) {
  const levelLabel = LEVEL_LABELS[program.level] ?? program.level;
  const backLabel = LEVEL_BACK_LABELS[program.level] ?? 'Programs';
  const fallbackImage = 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1600&q=80';

  return (
    <>
      <section className="relative h-[340px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${program.imageUrl || fallbackImage})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-main relative z-10 pb-12">
          <Link
            href={`/academics/${program.level}`}
            className="text-sm text-white/70 hover:text-white mb-4 inline-flex items-center gap-1"
          >
            ← {backLabel}
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="badge-accent">{levelLabel}</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white">
            {program.title}
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="section-title mb-6">Program Overview</h2>
          <p className="text-foreground-secondary leading-relaxed mb-8">
            {program.description}
          </p>

          <h2 className="section-title mb-6">Admission Requirements</h2>
          <div className="card p-6 mb-12">
            <ul className="space-y-3">
              {program.level === 'bachelors' && (
                <li className="flex items-start gap-2 text-sm text-foreground-secondary">
                  <CheckCircle size={14} className="text-success shrink-0 mt-1" />
                  High school diploma or equivalent qualification
                </li>
              )}
              {(program.level === 'masters' || program.level === 'phd') && (
                <li className="flex items-start gap-2 text-sm text-foreground-secondary">
                  <CheckCircle size={14} className="text-success shrink-0 mt-1" />
                  Recognized bachelor&apos;s degree from an accredited institution
                </li>
              )}
              <li className="flex items-start gap-2 text-sm text-foreground-secondary">
                <CheckCircle size={14} className="text-success shrink-0 mt-1" />
                Official transcripts from previous education
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary">
                <CheckCircle size={14} className="text-success shrink-0 mt-1" />
                Statement of purpose (200–1000 words)
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary">
                <CheckCircle size={14} className="text-success shrink-0 mt-1" />
                Valid passport or national ID
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary">
                <CheckCircle size={14} className="text-success shrink-0 mt-1" />
                Recent passport-size photograph
              </li>
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
                  The program name <strong>&quot;{program.title}&quot;</strong> is exactly what will be printed on your official certificate.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/admissions/apply" className="btn-primary gap-2">
              Apply Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
