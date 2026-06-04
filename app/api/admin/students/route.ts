import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, programName, programLevel, enrollmentYear, status } = body;

    if (!fullName || !email || !programName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const enrollmentId = `EUAU-${enrollmentYear}-${Math.floor(1000 + Math.random() * 9000)}`;

    const student = await prisma.student.create({
      data: {
        fullName,
        email,
        programName,
        programLevel: programLevel || 'Bachelors',
        enrollmentYear: parseInt(enrollmentYear) || new Date().getFullYear(),
        status: status || 'active',
        enrollmentId
      }
    });

    return NextResponse.json({ student });
  } catch (error) {
    console.error('[STUDENT_CREATE_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
