import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { submittedAt: 'desc' } });
    return NextResponse.json({ testimonials });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, isApproved } = body;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const testimonial = await prisma.testimonial.update({ where: { id }, data: { isApproved } });
    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
