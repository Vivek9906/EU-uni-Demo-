import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sanitizeInput, sanitizeHtml, slugify } from '@/lib/utils';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { title, content, excerpt, category, imageUrl, seoTitle, seoDesc, isPublished } = body;
    
    if (!title || !content || !excerpt || !category) {
      return NextResponse.json({ error: 'Title, content, excerpt, and category are required' }, { status: 400 });
    }

    const news = await prisma.news.update({
      where: { id: params.id },
      data: {
        title: sanitizeInput(title),
        slug: slugify(title),
        content: sanitizeHtml(content),
        excerpt: sanitizeInput(excerpt),
        category: sanitizeInput(category),
        imageUrl: imageUrl || null,
        seoTitle: seoTitle ? sanitizeInput(seoTitle) : null,
        seoDesc: seoDesc ? sanitizeInput(seoDesc) : null,
        isPublished: isPublished || false,
      },
    });
    return NextResponse.json({ success: true, news });
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.news.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
