import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sanitizeInput, slugify } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { 
      title, description, date, endDate, venue, category, 
      imageUrl, bannerImage, thumbnailImage, galleryImages, brochurePdf, isPublished 
    } = body;

    const event = await prisma.event.update({
      where: { id: params.id },
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
        isPublished: isPublished,
      },
    });
    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Failed to update event:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.event.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
