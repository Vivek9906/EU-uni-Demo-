import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sanitizeInput } from '@/lib/utils';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { question, answer, category } = body;
    if (!question || !answer || !category) {
      return NextResponse.json({ error: 'Question, answer, and category required' }, { status: 400 });
    }
    const faq = await prisma.fAQ.update({
      where: { id: params.id },
      data: {
        question: sanitizeInput(question),
        answer: sanitizeInput(answer),
        category: sanitizeInput(category),
      },
    });
    return NextResponse.json({ success: true, faq });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.fAQ.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
