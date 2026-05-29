import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, Award, BookOpen, GraduationCap } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Honorary Programs',
  description: 'EU American University Honorary programs: Honorary Doctorate (Honoris Causa), Doctor of Philosophy (PhD), and Honorary Professorship.',
};

const programs = [
  {
    name: 'Honorary Doctorate (Honoris Causa)',
    icon: Award,
    description: 'A prestigious academic recognition awarded to individuals who have demonstrated exceptional achievement, professional excellence, and significant contributions to their field, community, or society. This recognition honors a lifetime of distinguished service and leadership.',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
    eligibility: ['Minimum 10 years of professional experience', 'Demonstrated leadership in their field', 'Evidence of community impact', 'Professional references'],
  },
  {
    name: 'Doctor of Philosophy (PhD)',
    icon: BookOpen,
    description: 'An honorary recognition awarded to distinguished scholars and researchers whose lifetime contributions have significantly advanced their field of expertise. This program acknowledges individuals who have made substantial academic or intellectual contributions.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    eligibility: ['Significant academic or research contributions', 'Published works or major research projects', 'Recognition from academic peers', 'Professional references'],
  },
  {
    name: 'Honorary Professorship',
    icon: GraduationCap,
    description: 'An academic distinction recognizing outstanding contributions to education, research, or professional practice. Recipients are acknowledged among EU American University\'s distinguished faculty for their exceptional accomplishments.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    eligibility: ['Demonstrated excellence in education or research', 'Significant professional accomplishments', 'Contributions to academic community', 'Professional references'],
  },
];

export default function HonoraryPage() {
  return (
    <>
      <PageHero
        title="Honorary Programs"
        subtitle="EU American University&apos;s honorary programs recognize individuals who have demonstrated exceptional professional achievement, academic distinction, and significant contributions to their communities and fields of expertise."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Honorary Programs' }]}
      />

      <section className="section-padding">
        <div className="container-main">
          <div className="space-y-12">
            {programs.map((program) => (
              <div key={program.name} className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="relative h-72 lg:h-80 overflow-hidden rounded-card">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${program.imageUrl})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <program.icon className="w-7 h-7 text-accent" />
                    <h2 className="font-heading text-2xl font-bold">{program.name}</h2>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed mb-6">{program.description}</p>

                  <h3 className="font-heading text-base font-bold mb-3">Eligibility</h3>
                  <ul className="space-y-2 mb-6">
                    {program.eligibility.map((item) => (
                      <li key={item} className="text-sm text-foreground-secondary flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-3">
                    <Link href="/admissions/apply" className="btn-primary btn-sm gap-2">Apply Now <ArrowRight size={14} /></Link>
                    <Link href="/honorary-doctorate" className="text-sm font-medium text-primary hover:text-primary-light transition-colors">Learn More →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-accent/5 border-y border-accent/20">
        <div className="container-main text-center max-w-2xl mx-auto">
          <Award className="w-10 h-10 text-accent mx-auto mb-4" />
          <h3 className="font-heading text-xl font-bold mb-3">Certificate Note</h3>
          <p className="text-sm text-foreground-secondary">
            The program name you select during your application is <strong>exactly</strong> what will appear on your official certificate. Please ensure accuracy when choosing your honorary program designation.
          </p>
        </div>
      </section>
    </>
  );
}
