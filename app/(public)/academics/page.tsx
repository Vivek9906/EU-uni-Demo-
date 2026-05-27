import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Globe, Award, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academic Programs',
  description: 'Explore AMU\'s academic programs: Bachelor\'s MBA, Master\'s MBA, Honorary Doctorate, and Honorary Professorship.',
};

const programs = [
  {
    level: "Bachelor's",
    name: 'Bachelor of Business Administration (BBA)',
    description: 'A comprehensive undergraduate program developing foundational business skills in management, finance, marketing, and entrepreneurship with a global perspective.',
    duration: '3-4 Years',
    mode: 'Online / Hybrid / On-Campus',
    href: '/academics/bachelors',
    icon: BookOpen,
  },
  {
    level: "Master's",
    name: 'Master of Business Administration (MBA)',
    description: 'An advanced graduate program for aspiring leaders, combining strategic management, global business strategy, and practical leadership development for senior roles.',
    duration: '1-2 Years',
    mode: 'Online / Hybrid / On-Campus',
    href: '/academics/masters',
    icon: Award,
  },
  {
    level: 'PhD',
    name: 'Honorary Doctorate (Honoris Causa)',
    description: 'A prestigious academic recognition awarded to individuals who have demonstrated exceptional achievement and significant contributions to their field, community, or society.',
    duration: 'Recognition-Based',
    mode: 'Application & Nomination',
    href: '/academics/phd',
    icon: Award,
  },
  {
    level: 'PhD',
    name: 'Honorary Professorship',
    description: 'An academic distinction recognizing individuals who have made outstanding contributions to education, research, or their professional field at the highest level.',
    duration: 'Recognition-Based',
    mode: 'Application & Nomination',
    href: '/academics/phd',
    icon: Globe,
  },
];

export default function AcademicsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main">
          <div className="max-w-3xl">
            <span className="section-label">Academics</span>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Academic Programs
            </h1>
            <p className="text-lg text-foreground-secondary leading-relaxed">
              AMU offers carefully designed programs across Bachelor&apos;s, Master&apos;s, and Doctoral levels, each crafted to develop leaders who can make a meaningful global impact.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid gap-6 max-w-4xl mx-auto">
            {programs.map((program) => (
              <div key={program.name} className="card p-8 hover:border-primary/20 group">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <program.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="badge-primary mb-2">{program.level}</span>
                    <h2 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {program.name}
                    </h2>
                    <p className="text-foreground-secondary mb-4">{program.description}</p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-1.5 text-sm text-foreground-muted">
                        <Clock size={14} />
                        {program.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-foreground-muted">
                        <Globe size={14} />
                        {program.mode}
                      </div>
                    </div>
                    <Link
                      href={program.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
                    >
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-background-subtle rounded-card border border-border max-w-2xl mx-auto">
            <h3 className="font-heading text-xl font-bold mb-3">Important Note About Certificates</h3>
            <p className="text-sm text-foreground-secondary">
              The program name you select during your application is <strong>exactly</strong> what will appear on your official certificate. Please ensure accuracy when selecting your program during the application process.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
