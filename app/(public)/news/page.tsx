import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'News', description: 'Latest news and updates from American Management University.' };

const news = [
  { title: 'AMU Launches New Partnership with European Business Schools Network', date: 'March 15, 2025', category: 'Partnerships', excerpt: 'AMU partners with EBSN to offer expanded international opportunities for students and faculty.', slug: 'amu-european-partnership-2025' },
  { title: 'AMU Ranked Among Top 10 for Management Programs in Europe', date: 'February 20, 2025', category: 'Rankings', excerpt: "AMU earns a place among Europe's top 10 institutions for management and leadership education.", slug: 'amu-top-10-management-ranking' },
  { title: 'Honorary Doctorate Recipients Make Global Impact in 2025', date: 'January 10, 2025', category: 'Awards', excerpt: "AMU's 2025 Honorary Doctorate recipients demonstrate global reach across 30+ countries.", slug: 'honorary-doctorate-global-impact-2025' },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        title="Latest News"
        subtitle="Stay updated with the latest news from AMU."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Latest News' }]}
      />
      <section className="section-padding">
        <div className="container-main max-w-4xl space-y-6">
          {news.map((n) => (
            <article key={n.slug} className="card p-6 hover:border-primary/20">
              <div className="flex items-center gap-3 mb-3"><span className="badge-primary">{n.category}</span><span className="text-xs text-foreground-muted">{n.date}</span></div>
              <h2 className="font-heading text-xl font-bold mb-2">{n.title}</h2>
              <p className="text-foreground-secondary mb-4">{n.excerpt}</p>
              <Link href={`/news/${n.slug}`} className="text-sm font-semibold text-primary inline-flex items-center gap-1">READ MORE <ArrowRight size={14} /></Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
