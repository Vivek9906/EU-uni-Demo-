export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sanitizeInput } from '@/lib/utils';

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({ orderBy: { postedAt: 'desc' } });
    return NextResponse.json({ notices });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, category, attachmentUrl } = body;
    if (!title || !content || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const notice = await prisma.notice.create({
      data: { title: sanitizeInput(title), content: sanitizeInput(content), category, attachmentUrl: attachmentUrl || null },
    });
    return NextResponse.json({ success: true, notice }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

