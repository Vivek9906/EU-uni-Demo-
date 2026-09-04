import { prisma } from './db';
import { unstable_cache } from 'next/cache';

export const getPublicEvents = async (tab: 'upcoming' | 'past') => {
  const getCachedEvents = unstable_cache(
    async () => {
      const now = new Date();
      return prisma.event.findMany({
        where: {
          isPublished: true,
          ...(tab === 'upcoming' ? { date: { gte: now } } : { date: { lt: now } })
        },
        orderBy: {
          date: tab === 'upcoming' ? 'asc' : 'desc'
        },
        take: 10,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          date: true,
          endDate: true,
          venue: true,
          category: true,
          imageUrl: true,
          attendees: true,
        }
      });
    },
    [`public-events-${tab}`],
    { revalidate: 300, tags: ['events'] }
  );

  try {
    return await getCachedEvents();
  } catch (error) {
    console.error('[getPublicEvents Error]', error);
    return [];
  }
};

export const getCertificationBySlug = async (slug: string) => {
  try {
    return await prisma.certification.findUnique({
      where: { slug, isActive: true },
    });
  } catch (error) {
    console.error('[getCertification Error]', error);
    return null;
  }
};
