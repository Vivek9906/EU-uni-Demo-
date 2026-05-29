import type { Metadata } from 'next';
import Link from 'next/link';
import { FlaskConical, Globe, BookOpen, Users, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'Research', description: 'Research centers, projects, and publications at EU American University. Driving innovation and knowledge creation.' };

const centers = [
  { name: 'Center for Global Business Strategy', focus: 'International trade, cross-border investments, and global market dynamics.' },
  { name: 'Center for Leadership & Innovation', focus: 'Leadership development, organizational innovation, and change management.' },
  { name: 'Center for Digital Transformation', focus: 'AI in business, digital marketing, e-commerce, and technology management.' },
  { name: 'Center for Sustainable Business', focus: 'Corporate social responsibility, sustainability, and ethical business practices.' },
];

export default function ResearchPage() {
  return (
    <>
      <PageHero
        title="Research & Innovation"
        subtitle="EU American University is committed to advancing knowledge through cutting-edge research across 50+ centers worldwide."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Research & Innovation' }]}
      />
      <section className="section-padding">
        <div className="container-main">
          <h2 className="section-title mb-8 text-center">Research Centers</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {centers.map((c) => (
              <div key={c.name} className="card p-6"><div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3"><FlaskConical className="w-5 h-5 text-primary" /></div><h3 className="font-heading text-base font-bold mb-2">{c.name}</h3><p className="text-sm text-foreground-secondary">{c.focus}</p></div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center"><Globe className="w-8 h-8 text-primary mx-auto mb-3" /><div className="text-2xl font-heading font-bold text-primary">50+</div><div className="text-sm text-foreground-muted">Research Centers</div></div>
            <div className="card p-6 text-center"><BookOpen className="w-8 h-8 text-primary mx-auto mb-3" /><div className="text-2xl font-heading font-bold text-primary">200+</div><div className="text-sm text-foreground-muted">Publications</div></div>
            <div className="card p-6 text-center"><Users className="w-8 h-8 text-primary mx-auto mb-3" /><div className="text-2xl font-heading font-bold text-primary">120+</div><div className="text-sm text-foreground-muted">Research Partners</div></div>
          </div>
          <div className="text-center"><Link href="/contact" className="btn-primary gap-2">Submit Research Inquiry <ArrowRight size={16} /></Link></div>
        </div>
      </section>
    </>
  );
}
