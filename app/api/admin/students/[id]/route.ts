import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const student = await prisma.student.findUnique({
      where: { id: params.id },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ student });
  } catch (error) {
    console.error('[STUDENT_GET_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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
      enrollmentId,
      status,
      photo,
      photoPublicId,
      isPubliclyVisible,
    } = body;

    // Check if student exists
    const existing = await prisma.student.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // If enrollmentId is being changed, check for uniqueness
    if (enrollmentId && enrollmentId !== existing.enrollmentId) {
      const duplicate = await prisma.student.findUnique({
        where: { enrollmentId },
      });
      if (duplicate) {
        return NextResponse.json({ error: 'Enrollment ID already in use' }, { status: 409 });
      }
    }

    const student = await prisma.student.update({
      where: { id: params.id },
      data: {
        ...(fullName !== undefined && { fullName }),
        ...(email !== undefined && { email }),
        ...(programName !== undefined && { programName }),
        ...(programLevel !== undefined && { programLevel }),
        ...(graduatingYear !== undefined && { graduatingYear: parseInt(graduatingYear) || existing.graduatingYear }),
        ...(enrollmentId !== undefined && { enrollmentId }),
        ...(status !== undefined && { status }),
        ...(photo !== undefined && { photo }),
        ...(photoPublicId !== undefined && { photoPublicId }),
        ...(isPubliclyVisible !== undefined && { isPubliclyVisible }),
      },
    });

    revalidatePath('/student-verification');
    revalidatePath(`/student-verification/${student.enrollmentId}`);
    revalidatePath('/dashboard/students');

    return NextResponse.json({ success: true, student });
  } catch (error) {
    console.error('[STUDENT_UPDATE_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const student = await prisma.student.delete({
      where: { id: params.id },
    });

    revalidatePath('/student-verification');
    revalidatePath('/dashboard/students');

    return NextResponse.json({ success: true, student });
  } catch (error) {
    console.error('[STUDENT_DELETE_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
