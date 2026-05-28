import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { checkRateLimit, RATE_LIMITS, getClientIp, rateLimitResponse } from '@/lib/rate-limit';

export async function GET(
  request: Request,
  { params }: { params: { enrollmentId: string } }
) {
  try {
    // Check rate limit
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`student-verify:${ip}`, RATE_LIMITS.general);

    if (!rateCheck.allowed) {
      return rateLimitResponse(rateCheck.resetIn);
    }

    const { enrollmentId } = params;

    if (!enrollmentId) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: {
        enrollmentId: enrollmentId,
      },
      select: {
        enrollmentId: true,
        fullName: true,
        programName: true,
        programLevel: true,
        enrollmentYear: true,
        expectedCompletion: true,
        status: true,
        photo: true,
        isPubliclyVisible: true,
      },
    });

    if (!student || !student.isPubliclyVisible) {
      return NextResponse.json(
        { error: 'No matching record found' },
        { status: 404 }
      );
    }

    // Return the safe public data
    return NextResponse.json({
      student: {
        enrollmentId: student.enrollmentId,
        fullName: student.fullName,
        programName: student.programName,
        programLevel: student.programLevel,
        enrollmentYear: student.enrollmentYear,
        expectedCompletion: student.expectedCompletion,
        status: student.status,
        photo: student.photo,
      }
    });

  } catch (error) {
    console.error('Error in student verification API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
