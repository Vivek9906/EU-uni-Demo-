import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';

const getCachedCertification = (slug: string) =>
  unstable_cache(
    async () => {
      return prisma.certification.findUnique({
        where: { slug },
        select: {
          id: true,
          slug: true,
          title: true,
          category: true,
          description: true,
          imageUrl: true,
          isBundle: true,
          isActive: true,
          order: true,
        },
      });
    },
    [`api-certification-detail-${slug}`],
    { revalidate: 300, tags: ['certifications'] }
  );

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const certification = await getCachedCertification(params.slug)();

    if (!certification || !certification.isActive) {
      return NextResponse.json(
        { error: 'Certification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { certification },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching certification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

