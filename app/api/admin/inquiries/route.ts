export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const inquiries = await prisma.contactInquiry.findMany({ orderBy: { receivedAt: 'desc' } });
    return NextResponse.json({ inquiries });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
    const inquiry = await prisma.contactInquiry.update({ where: { id }, data: { status } });
    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

