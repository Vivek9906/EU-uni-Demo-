import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      fullName,
      email,
      programName,
      programLevel,
      graduatingYear,
      enrollmentId: manualEnrollmentId,
      status,
      photo,
      photoPublicId,
      isPubliclyVisible,
    } = body;

    if (!fullName || !email || !programName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Use manual enrollment ID if provided, otherwise auto-generate
    let enrollmentId = manualEnrollmentId?.trim();
    if (!enrollmentId) {
      const year = parseInt(graduatingYear) || new Date().getFullYear();
      // Generate a unique enrollment ID
      const count = await prisma.student.count({
        where: { graduatingYear: year },
      });
      const padded = String(count + 1).padStart(5, '0');
      enrollmentId = `EUAU-${year}-${padded}`;
    }

    // Check if enrollment ID already exists
    const existing = await prisma.student.findUnique({
      where: { enrollmentId },
    });
    if (existing) {
      return NextResponse.json({ error: 'Enrollment ID already exists' }, { status: 409 });
    }

    const student = await prisma.student.create({
      data: {
        fullName,
        email,
        programName,
        programLevel: programLevel || '',
        graduatingYear: parseInt(graduatingYear) || new Date().getFullYear(),
        status: status || 'enrolled',
        enrollmentId,
        photo: photo || null,
        photoPublicId: photoPublicId || null,
        isPubliclyVisible: isPubliclyVisible !== undefined ? isPubliclyVisible : true,
      }
    });

    revalidatePath('/student-verification');
    revalidatePath('/dashboard/students');

    return NextResponse.json({ success: true, student });
  } catch (error) {
    console.error('[STUDENT_CREATE_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
