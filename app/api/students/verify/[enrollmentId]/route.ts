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

    const rawId = params.enrollmentId?.trim()?.toUpperCase();
    const normalizedId = rawId?.replace(/^AMU-/, 'EUAU-');

    if (!normalizedId || !/^EUAU-\d{4}-\d{5}$/.test(normalizedId)) {
      return NextResponse.json({ found: false }, { status: 200 });
    }

    const student = await prisma.student.findUnique({
      where: {
        enrollmentId: normalizedId,
      },
      select: {
        enrollmentId: true,
        fullName: true,
        programName: true,
        programLevel: true,
        enrollmentYear: true,
        intendedStartDate: true,
        expectedCompletion: true,
        status: true,
        photo: true,
        isPubliclyVisible: true,
      },
    });

    if (!student || !student.isPubliclyVisible) {
      return NextResponse.json(
        { found: false },
        { status: 200 }
      );
    }

    // Return the safe public data
    return NextResponse.json(
      { found: true, student },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in student verification API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
