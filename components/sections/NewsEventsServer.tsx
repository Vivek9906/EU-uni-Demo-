import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';
import NewsEvents from './NewsEvents';

const getCachedNewsEvents = unstable_cache(
  async () => {
    const dbNews = await prisma.news.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      select: {
        publishedAt: true,
        createdAt: true,
        category: true,
        title: true,
        excerpt: true,
        slug: true,
      },
    });

    const newsItems = dbNews.map(n => ({
      date: n.publishedAt ? n.publishedAt.toLocaleDateString() : n.createdAt.toLocaleDateString(),
      category: n.category,
      title: n.title,
      excerpt: n.excerpt,
      slug: n.slug,
    }));

    const dbEvent = await prisma.event.findFirst({
      where: { isPublished: true, date: { gte: new Date() } },
      orderBy: { date: 'asc' },
      select: {
        date: true,
        title: true,
        venue: true,
        slug: true,
      },
    });

    const upcomingEvent = dbEvent ? {
      date: dbEvent.date.toLocaleDateString(),
      title: dbEvent.title,
      venue: dbEvent.venue,
      slug: dbEvent.slug,
    } : undefined;

    return { newsItems, upcomingEvent };
  },
  ['news-events-homepage'],
  { revalidate: 300, tags: ['news', 'events'] }
);

export default async function NewsEventsServer() {
  let newsItems: { date: string; category: string; title: string; excerpt: string; slug: string }[] = [];
  let upcomingEvent: { date: string; title: string; venue: string; slug: string } | undefined;

  try {
    const data = await getCachedNewsEvents();
    newsItems = data.newsItems;
    upcomingEvent = data.upcomingEvent;
  } catch (error) {
    console.error('[NewsEventsServer] DB error:', error);
  }

  return <NewsEvents newsItems={newsItems} upcomingEvent={upcomingEvent} />;
}
