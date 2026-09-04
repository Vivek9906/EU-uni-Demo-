import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'News', description: 'Latest news and updates from EU American University.' };

import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';

const getCachedNews = unstable_cache(
  async () => {
    const data = await prisma.news.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        publishedAt: true,
        createdAt: true,
      },
    });
    return data.map(n => ({
      ...n,
      createdAt: n.createdAt.toISOString(),
      publishedAt: n.publishedAt ? n.publishedAt.toISOString() : null
    }));
  },
  ['news-list'],
  { revalidate: 300, tags: ['news'] }
);

export default async function NewsPage() {
  let news: any[] = [];
  try {
    news = await getCachedNews();
  } catch (error) {
    console.error('[NewsPage] DB error:', error);
  }
  return (
    <>
      <PageHero
        title="Latest News"
        subtitle="Stay updated with the latest news from EU American University."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Latest News' }]}
      />
      <section className="section-padding">
        <div className="container-main max-w-4xl space-y-6">
          {news.map((n) => (
            <article key={n.slug} className="card p-6 hover:border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="badge-primary">{n.category}</span>
                <span className="text-xs text-foreground-muted">
                  {new Date(n.publishedAt || n.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
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
