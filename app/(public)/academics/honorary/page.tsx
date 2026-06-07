import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, GraduationCap } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { prisma } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Honorary Programs',
  description: 'EU American University Honorary programs: Honorary Doctorate (Honoris Causa) and Honorary Professorship.',
};

export default async function HonoraryPage() {
  const programs = await prisma.program.findMany({
    where: { level: 'honorary', isActive: true },
    orderBy: { order: 'asc' },
  });

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
            {programs.map((program, i) => (
              <div key={program.slug} className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="relative h-72 lg:h-80 overflow-hidden rounded-card">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${program.imageUrl || 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80'})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {i === 0 ? <Award className="w-7 h-7 text-accent" /> : <GraduationCap className="w-7 h-7 text-accent" />}
                    <h2 className="font-heading text-2xl font-bold">{program.title}</h2>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed mb-6">{program.description}</p>

                  <div className="flex items-center gap-3">
                    <Link href="/admissions/apply" className="btn-primary btn-sm gap-2">Apply Now <ArrowRight size={14} /></Link>
                    <Link href={`/academics/honorary/${program.slug}`} className="text-sm font-medium text-primary hover:text-primary-light transition-colors">Learn More →</Link>
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
