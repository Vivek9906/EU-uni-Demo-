import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';
import ProgramsSection from '@/components/sections/ProgramsSection';
import { PROGRAMS_ORDERED } from '@/lib/programs';

const getCachedPrograms = unstable_cache(
  async () => {
    return prisma.program.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: {
        title: true,
        slug: true,
        level: true,
        description: true,
        imageUrl: true,
      },
    });
  },
  ['programs-section'],
  { revalidate: 3600, tags: ['programs'] }
);

export default async function ProgramsSectionServer() {
  let dbPrograms;
  try {
    dbPrograms = await getCachedPrograms();
  } catch (error) {
    console.error('[ProgramsSectionServer] DB error, using static fallback:', error);
    // Fallback to static data — imageUrl will be null, component handles this with a default image
    dbPrograms = PROGRAMS_ORDERED.map((p) => ({
      title: p.title,
      slug: p.slug,
      level: p.level,
      description: (p as any).description ?? '',
      imageUrl: null,
    }));
  }

  return <ProgramsSection dbPrograms={dbPrograms} />;
}
