import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Academic Programs',
  description:
    'Explore EU American University\'s academic programs: Bachelor\'s (BBA, BPA, BSW), Master\'s (MBA, MPA, MSW), Doctoral research programs, and Honorary programs.',
};

const programs = [
  {
    level: "Bachelor's",
    items: [
      {
        name: 'Bachelor of Business Administration (BBA)',
        href: '/academics/bachelors/bba',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        description:
          'Build foundational business skills in management, finance, marketing, and entrepreneurship with a global perspective.',
      },
      {
        name: 'Bachelor of Public Administration (BPA)',
        href: '/academics/bachelors/bpa',
        imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
        description:
          'Prepare for leadership roles in government and nonprofit organizations through the study of public policy and governance.',
      },
      {
        name: 'Bachelor of Social Work (BSW)',
        href: '/academics/bachelors/bsw',
        imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
        description:
          'Develop the skills needed to support individuals and communities through counseling, advocacy, and social welfare programs.',
      },
    ],
  },
  {
    level: "Master's",
    items: [
      {
        name: 'Master of Business Administration (MBA)',
        href: '/academics/masters/mba',
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
        description:
          'An advanced program for professionals seeking senior leadership positions through strategic thinking and executive decision-making.',
      },
      {
        name: 'Master of Public Administration (MPA)',
        href: '/academics/masters/mpa',
        imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
        description:
          'Advance your career in public service with graduate-level expertise in policy analysis and organizational management.',
      },
      {
        name: 'Master of Social Work (MSW)',
        href: '/academics/masters/msw',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
        description:
          'Deepen your expertise in clinical practice, community organization, and social policy to make a meaningful impact on society.',
      },
    ],
  },
  {
    level: 'Doctoral',
    items: [
      {
        name: 'Doctor of Philosophy (PhD)',
        href: '/academics/phd/doctor-of-philosophy',
        imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
        description:
          'A fully online doctoral research program designed for scholars and professionals seeking advanced academic inquiry and global recognition.',
      },
    ],
  },
  {
    level: 'Honorary',
    items: [
      {
        name: 'Honorary Doctorate (Honoris Causa)',
        href: '/academics/honorary/honorary-doctorate',
        imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
        description:
          'A prestigious recognition for individuals who have demonstrated exceptional leadership and contributions to their field.',
      },
      {
        name: 'Honorary Professorship',
        href: '/academics/honorary/honorary-professorship',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
        description:
          'An academic distinction recognizing outstanding contributions to education, research, or professional excellence.',
      },
    ],
  },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        title="Academic Programs"
        subtitle="EU American University offers carefully designed programs across Bachelor's, Master's, Doctoral, and Honorary levels, each crafted to develop leaders who can make a meaningful global impact."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Academic Programs' }]}
      />

      {programs.map((group) => (
        <section key={group.level} className="section-padding border-b border-border last:border-b-0">
          <div className="container-main">
            <h2 className="section-title mb-8">{group.level} Programs</h2>
            <div className={`grid gap-6 ${group.level === 'Doctoral' ? 'md:grid-cols-1 max-w-3xl' : 'md:grid-cols-3'}`}>
              {group.items.map((program) => (
                <div
                  key={program.name}
                  className="bg-background-card border border-border rounded-card shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${program.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  </div>
                  <div className="p-5">
                    <span className="badge-primary mb-2">{group.level}</span>
                    <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                      {program.name}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed mb-4">{program.description}</p>
                    <div className="flex items-center gap-3">
                      <Link
                        href={program.href}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
                      >
                        View Details <ArrowRight size={14} />
                      </Link>
                      <Link
                        href="/admissions/apply"
                        className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-padding bg-background-subtle">
        <div className="container-main text-center max-w-2xl mx-auto">
          <h3 className="font-heading text-xl font-bold mb-3">Important Note About Certificates</h3>
          <p className="text-sm text-foreground-secondary">
            The program name you select during your application is <strong>exactly</strong> what will appear on your official certificate. Please ensure accuracy when selecting your program during the application process.
          </p>
        </div>
      </section>
    </>
  );
}
