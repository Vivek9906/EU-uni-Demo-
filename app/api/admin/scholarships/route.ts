import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sanitizeInput } from '@/lib/utils';

export async function GET() {
  try {
    const scholarships = await prisma.scholarship.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ scholarships });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, amount, eligibility, deadline, description } = body;
    if (!name || !type || !amount || !eligibility || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const scholarship = await prisma.scholarship.create({
      data: {
        name: sanitizeInput(name), type, amount: sanitizeInput(amount),
        eligibility: sanitizeInput(eligibility), description: sanitizeInput(description),
        deadline: deadline ? new Date(deadline) : null, isActive: true,
      },
    });
    return NextResponse.json({ success: true, scholarship }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
