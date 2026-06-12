import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
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
    const body = await req.json();
    const {
      fullName,
      email,
      programName,
      programLevel,
      enrollmentYear,
      enrollmentId,
      status,
      photo,
      intendedStartDate,
      expectedCompletion,
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
        ...(enrollmentYear !== undefined && { enrollmentYear: parseInt(enrollmentYear) || existing.enrollmentYear }),
        ...(enrollmentId !== undefined && { enrollmentId }),
        ...(status !== undefined && { status }),
        ...(photo !== undefined && { photo }),
        ...(intendedStartDate !== undefined && { intendedStartDate }),
        ...(expectedCompletion !== undefined && { expectedCompletion }),
        ...(isPubliclyVisible !== undefined && { isPubliclyVisible }),
      },
    });

    return NextResponse.json({ student });
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
    const student = await prisma.student.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, student });
  } catch (error) {
    console.error('[STUDENT_DELETE_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
