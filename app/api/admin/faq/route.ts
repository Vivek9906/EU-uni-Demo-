import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sanitizeInput } from '@/lib/utils';

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] });
    return NextResponse.json({ faqs });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, answer, category } = body;
    if (!question || !answer || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const faq = await prisma.fAQ.create({
      data: { question: sanitizeInput(question), answer: sanitizeInput(answer), category, isActive: true },
    });
    return NextResponse.json({ success: true, faq }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
