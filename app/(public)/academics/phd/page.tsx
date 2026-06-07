import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { prisma } from '@/lib/db';

export const metadata: Metadata = {
  title: 'PhD Programs',
  description: 'EU American University PhD programs. Advance the boundaries of knowledge through independent research and academic inquiry.',
};

export default async function PhdPage() {
  const programs = await prisma.program.findMany({
    where: { level: 'phd', isActive: true },
    orderBy: { order: 'asc' },
  });

  return (
    <>
      <PageHero
        title="PhD Programs"
        subtitle="EU American University's doctoral programs recognize individuals who are committed to deepening their expertise through independent research and scholarly contribution."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'PhD Programs' }]}
      />

      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div key={program.slug} className="bg-background-card border border-border rounded-card shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${program.imageUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80'})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6 flex flex-col h-[220px]">
                  <h2 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{program.title}</h2>
                  <p className="text-sm text-foreground-secondary leading-relaxed mb-4 flex-1 line-clamp-3">{program.description}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <Link href={`/academics/phd/${program.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors">View Details <ArrowRight size={14} /></Link>
                    <Link href="/admissions/apply" className="text-sm font-medium text-accent hover:text-accent-dark transition-colors">Apply Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
