import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { prisma } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Academic Programs',
  description:
    'Explore EU American University\'s academic programs: Bachelor\'s (BBA, BPA, BSW), Master\'s (MBA, MPA, MSW), Doctoral research programs, and Honorary programs.',
};

export default async function AcademicsPage() {
  const dbPrograms = await prisma.program.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  });

  const phd = dbPrograms.filter(p => p.level === 'phd');
  const honorary = dbPrograms.filter(p => p.level === 'honorary');
  const masters = dbPrograms.filter(p => p.level === 'masters');
  const bachelors = dbPrograms.filter(p => p.level === 'bachelors');

  const programs = [
    ...(phd.length > 0 ? [{ level: 'Doctoral', items: phd }] : []),
    ...(honorary.length > 0 ? [{ level: 'Honorary', items: honorary }] : []),
    ...(masters.length > 0 ? [{ level: "Master's", items: masters }] : []),
    ...(bachelors.length > 0 ? [{ level: "Bachelor's", items: bachelors }] : []),
  ];

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
                  key={program.title}
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
                      {program.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed mb-4">{program.description}</p>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/academics/${program.level}/${program.slug}`}
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
