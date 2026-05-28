import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const whereCondition = category && category !== 'all' 
      ? { category, isActive: true } 
      : { isActive: true };

    const certifications = await prisma.certification.findMany({
      where: whereCondition,
      orderBy: [
        { isBundle: 'desc' },
        { order: 'asc' }
      ],
    });

    return NextResponse.json({ certifications });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
