import { prisma } from '@/lib/db';
import NewsEvents from './NewsEvents';

export default async function NewsEventsServer() {
  const dbNews = await prisma.news.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
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
  });

  const upcomingEvent = dbEvent ? {
    date: dbEvent.date.toLocaleDateString(),
    title: dbEvent.title,
    venue: dbEvent.venue,
    slug: dbEvent.slug,
  } : undefined;

  return <NewsEvents newsItems={newsItems} upcomingEvent={upcomingEvent} />;
}
