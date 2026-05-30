import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sanitizeInput, slugify } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const events = await prisma.event.findMany({ orderBy: { date: 'desc' } });
    return NextResponse.json({ events });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { 
      title, description, date, endDate, venue, category, 
      imageUrl, bannerImage, thumbnailImage, galleryImages, brochurePdf, isPublished 
    } = body;

    if (!title || !description || !date || !venue || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        title: sanitizeInput(title),
        slug: slugify(title),
        description: sanitizeInput(description),
        date: new Date(date),
        endDate: endDate ? new Date(endDate) : null,
        venue: sanitizeInput(venue),
        category: sanitizeInput(category),
        imageUrl: imageUrl || null,
        bannerImage: bannerImage || null,
        thumbnailImage: thumbnailImage || null,
        galleryImages: galleryImages || null,
        brochurePdf: brochurePdf || null,
        isPublished: isPublished || false,
      },
    });
    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error) {
    console.error('Failed to create event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
