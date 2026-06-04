import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sanitizeInput, sanitizeHtml, slugify } from '@/lib/utils';
import { sendBroadcastEmail } from '@/lib/email';

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

    if (isPublished) {
      try {
        const subscribers = await prisma.subscriber.findMany({
          select: { email: true }
        });
        const emails = subscribers.map(s => s.email);
        if (emails.length > 0) {
          const newsUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/news/${news.slug}`;
          sendBroadcastEmail(
            emails, 
            `News: ${news.title}`, 
            news.title, 
            news.excerpt || '', 
            newsUrl, 
            'Read Full Article'
          ).catch(console.error);
        }
      } catch (err) {
        console.error("Failed to broadcast news:", err);
      }
    }

    return NextResponse.json({ success: true, news }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
