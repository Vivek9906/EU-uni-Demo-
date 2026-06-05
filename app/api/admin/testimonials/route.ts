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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, content, avatarUrl, isApproved } = body;
    
    if (!name || !role || !content) {
      return NextResponse.json({ error: 'Name, role, and content are required' }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        program: role,
        content,
        photo: avatarUrl || null,
        isApproved: isApproved || false,
      },
    });
    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error) {
    console.error('Failed to create testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
