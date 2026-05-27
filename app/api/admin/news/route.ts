import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sanitizeInput, sanitizeHtml, slugify } from '@/lib/utils';

export async function GET() {
  try {
    const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ news });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, excerpt, category, imageUrl, seoTitle, seoDesc, isPublished } = body;
    if (!title || !content || !excerpt || !category) {
      return NextResponse.json({ error: 'Title, content, excerpt, and category are required' }, { status: 400 });
    }
    const news = await prisma.news.create({
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
        publishedAt: isPublished ? new Date() : null,
      },
    });
    return NextResponse.json({ success: true, news }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
