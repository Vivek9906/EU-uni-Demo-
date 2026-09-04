import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';

const getCachedNotices = unstable_cache(
  async () => {
    return prisma.notice.findMany({
      where: { isActive: true },
      orderBy: { postedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        category: true,
      },
    });
  },
  ['api-notices-public'],
  { revalidate: 300, tags: ['notices'] }
);

export async function GET() {
  try {
    const notices = await getCachedNotices();
    return NextResponse.json(
      { notices },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching public notices:', error);
    return NextResponse.json({ notices: [] }, { status: 200 });
  }
}

