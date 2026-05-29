export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      where: {
        isActive: true,
      },
      orderBy: { postedAt: 'desc' },
      take: 5,
    });
    return NextResponse.json({ notices }, { status: 200 });
  } catch (error) {
    console.error('Error fetching public notices:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
