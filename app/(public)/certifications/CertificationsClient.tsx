'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Award } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

type Category = 'all' | 'technology' | 'business' | 'engineering' | 'research' | 'personal' | 'bundle';

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'technology', label: 'Technology & IT' },
  { key: 'business', label: 'Business & Management' },
  { key: 'engineering', label: 'Engineering' },
  { key: 'research', label: 'Research & Academia' },
  { key: 'personal', label: 'Personal Development' },
];

const categoryColors: Record<string, string> = {
  technology: 'bg-blue-100 text-blue-700',
  business: 'bg-green-100 text-green-700',
  engineering: 'bg-orange-100 text-orange-700',
  research: 'bg-purple-100 text-purple-700',
  personal: 'bg-pink-100 text-pink-700',
  bundle: 'bg-accent/10 text-accent',
};

export interface CertData {
  slug: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  isBundle: boolean;
}

export default function CertificationsClient({ certifications }: { certifications: CertData[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCerts = useMemo(() => {
    return certifications.filter((cert) => {
      const matchesCategory = activeCategory === 'all' || cert.category === activeCategory;
      const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [certifications, activeCategory, searchQuery]);

  const bundle = certifications.find(c => c.isBundle);
  const regularCerts = filteredCerts.filter(c => !c.isBundle);

  return (
    <>
      <PageHero
        title="Professional Certifications"
        subtitle="Advance your career with industry-relevant certification programs from EU American University. Each program is designed to provide focused, practical skills recognized by employers worldwide."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Professional Certifications' }]}
      />

      {/* Bundle Banner */}
      {bundle && activeCategory === 'all' && !searchQuery && (
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-main py-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Award className="w-12 h-12 text-accent shrink-0" />
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-heading text-2xl font-bold mb-2">{bundle.title}</h2>
                <p className="text-white/70">Master all professional domains in one comprehensive package — the most cost-effective way to build a world-class skill portfolio.</p>
              </div>
              <Link href={`/certifications/${bundle.slug}`} className="btn-accent shrink-0 gap-2">
                View Details <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container-main">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
              <input
                type="text"
                placeholder="Search certifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
                id="cert-search"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat.key
                      ? 'bg-[#E09900] text-white'
                      : 'bg-background-subtle text-foreground-secondary hover:bg-[#E09900]/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-foreground-muted mb-6">{regularCerts.length} certifications found</p>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularCerts.map((cert) => (
              <div key={cert.slug} className="bg-background-card border border-border rounded-card shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden group">
                <div className="relative h-40 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${cert.imageUrl})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${categoryColors[cert.category] || 'bg-gray-100 text-gray-700'}`}>
                      {cert.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <Link href={`/certifications/${cert.slug}`} className="block">
                    <h3 className="font-heading text-base font-bold mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                      {cert.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-foreground-secondary leading-relaxed mb-4 line-clamp-2">{cert.description}</p>
                  <div className="flex items-center gap-4">
                    <Link href={`/certifications/${cert.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors">
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {regularCerts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-foreground-muted">No certifications match your search.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
