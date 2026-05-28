import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: "Master's Programs",
  description: "Explore EU American University's Master's programs: MBA, MPA, and MSW. Fully online, globally recognized graduate degrees.",
};

const programs = [
  { name: 'Master of Business Administration (MBA)', slug: 'mba', description: 'An advanced program for professionals seeking senior leadership positions through strategic thinking and executive decision-making.', imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80' },
  { name: 'Master of Public Administration (MPA)', slug: 'mpa', description: 'Advance your career in public service with graduate-level expertise in policy analysis, organizational management, and governance.', imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80' },
  { name: 'Master of Social Work (MSW)', slug: 'msw', description: 'Deepen your expertise in clinical practice, community organization, and social policy to make a meaningful impact on society.', imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80' },
];

export default function MastersPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main">
          <div className="max-w-3xl">
            <Link href="/academics" className="text-sm text-primary hover:text-primary-light mb-4 inline-flex items-center gap-1">← Back to Programs</Link>
            <span className="section-label">Graduate</span>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">Master&apos;s Programs</h1>
            <p className="text-lg text-foreground-secondary leading-relaxed">
              EU American University offers three graduate programs designed for working professionals who want to advance into senior leadership roles in business, public service, and social work.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div key={program.slug} className="bg-background-card border border-border rounded-card shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${program.imageUrl})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-medium px-2.5 py-1 rounded-full"><Globe size={12} />Online</span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors">{program.name}</h2>
                  <p className="text-sm text-foreground-secondary leading-relaxed mb-4">{program.description}</p>
                  <div className="flex items-center gap-3">
                    <Link href={`/academics/masters/${program.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors">View Details <ArrowRight size={14} /></Link>
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
