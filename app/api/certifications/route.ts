export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';

const getCachedCertifications = (category?: string) =>
  unstable_cache(
    async () => {
      const whereCondition = category && category !== 'all'
        ? { category, isActive: true }
        : { isActive: true };

      return prisma.certification.findMany({
        where: whereCondition,
        orderBy: [
          { isBundle: 'desc' },
          { order: 'asc' }
        ],
        select: {
          id: true,
          slug: true,
          title: true,
          category: true,
          description: true,
          imageUrl: true,
          isBundle: true,
          order: true,
        },
      });
    },
    [`api-certifications-list-${category ?? 'all'}`],
    { revalidate: 300, tags: ['certifications'] }
  );

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;

    const certifications = await getCachedCertifications(category)();

    return NextResponse.json(
      { certifications },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      { certifications: [] },
      { status: 200 }
    );
  }
}

