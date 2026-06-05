export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sanitizeInput } from '@/lib/utils';

export async function GET() {
  try {
    const faculty = await prisma.faculty.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json({ faculty });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, designation, department, specialization, bio, photo, email, publications } = body;
    if (!name || !designation || !department || !specialization || !bio) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const faculty = await prisma.faculty.create({
      data: {
        name: sanitizeInput(name),
        designation: sanitizeInput(designation),
        department: sanitizeInput(department),
        specialization: sanitizeInput(specialization),
        bio: sanitizeInput(bio),
        photo: photo || null,
        email: email ? sanitizeInput(email) : null,
        publications: publications || [],
      },
    });
    return NextResponse.json({ success: true, faculty }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

