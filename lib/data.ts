import { unstable_cache } from 'next/cache';
import { prisma } from './db';

// Cache public events data for 1 hour
export const getPublicEvents = unstable_cache(
  async (tab: 'upcoming' | 'past') => {
    const now = new Date();
    try {
      return await prisma.event.findMany({
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
    } catch (error) {
      console.error('[getPublicEvents Error]', error);
      return [];
    }
  },
  ['public-events'],
  { revalidate: 3600, tags: ['public-data', 'events'] }
);

// We can add other cached functions here as needed
export const getCertificationBySlug = unstable_cache(
  async (slug: string) => {
    try {
      return await prisma.certification.findUnique({
        where: { slug, isActive: true },
      });
    } catch (error) {
      console.error('[getCertification Error]', error);
      return null;
    }
  },
  ['certification-by-slug'],
  { revalidate: 3600, tags: ['public-data', 'certifications'] }
);
