import { prisma } from './db';

export const getPublicEvents = async (tab: 'upcoming' | 'past') => {
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
