import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: "Bachelor's Programs",
  description: "Explore EU American University's Bachelor's programs: BBA, BPA, and BSW. Fully online, globally recognized undergraduate degrees.",
};

const programs = [
  { name: 'Bachelor of Business Administration (BBA)', slug: 'bba', description: 'Build foundational business skills in management, finance, marketing, and entrepreneurship with a global perspective.', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80' },
  { name: 'Bachelor of Public Administration (BPA)', slug: 'bpa', description: 'Prepare for leadership roles in government and nonprofit organizations through the study of public policy, governance, and civic leadership.', imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80' },
  { name: 'Bachelor of Social Work (BSW)', slug: 'bsw', description: 'Develop the skills needed to support individuals and communities through counseling, advocacy, and social welfare programs.', imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80' },
];

export default function BachelorsPage() {
  return (
    <>
      <PageHero
        title="Bachelor&apos;s Programs"
        subtitle="EU American University offers three undergraduate programs designed to provide a strong academic foundation and prepare graduates for professional success in business, public service, and social work."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Bachelor&apos;s Programs' }]}
      />

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
                    <Link href={`/academics/bachelors/${program.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors">View Details <ArrowRight size={14} /></Link>
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
