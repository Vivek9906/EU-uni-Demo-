import type { Metadata } from 'next';
import Link from 'next/link';
import { Users, Globe, ArrowRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Alumni', description: 'AMU alumni network — connecting graduates across 100+ countries.' };

export default function AlumniPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main"><span className="section-label">Community</span><h1 className="text-4xl font-heading font-bold mb-4">Alumni Network</h1><p className="text-lg text-foreground-secondary">Join a global community of AMU graduates making an impact worldwide.</p></div>
      </section>
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center"><div className="text-3xl font-heading font-bold text-primary">15,000+</div><div className="text-sm text-foreground-muted">Alumni Worldwide</div></div>
            <div className="card p-6 text-center"><div className="text-3xl font-heading font-bold text-primary">100+</div><div className="text-sm text-foreground-muted">Countries Represented</div></div>
            <div className="card p-6 text-center"><div className="text-3xl font-heading font-bold text-primary">95%</div><div className="text-sm text-foreground-muted">Career Advancement</div></div>
          </div>
          <div className="card p-8 text-center max-w-xl mx-auto">
            <Users className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-xl font-bold mb-3">Join Our Alumni Network</h2>
            <p className="text-sm text-foreground-secondary mb-6">Honorary Doctorate and Professorship recipients are automatically listed among AMU&apos;s distinguished alumni community.</p>
            <Link href="/contact" className="btn-primary gap-2">Register as Alumni <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
