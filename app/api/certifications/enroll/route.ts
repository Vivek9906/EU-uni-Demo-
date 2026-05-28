import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { checkRateLimit, RATE_LIMITS, getClientIp, rateLimitResponse } from '@/lib/rate-limit';
import * as z from 'zod';

const enrollmentSchema = z.object({
  certificationSlug: z.string().min(1, 'Certification is required'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Check rate limit
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`cert-enroll:${ip}`, RATE_LIMITS.application);

    if (!rateCheck.allowed) {
      return rateLimitResponse(rateCheck.resetIn);
    }

    const body = await request.json();
    
    // Validate request body
    const validatedData = enrollmentSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validatedData.error.format() },
        { status: 400 }
      );
    }

    const { certificationSlug, ...enrollmentData } = validatedData.data;

    // Find the certification ID
    const certification = await prisma.certification.findUnique({
      where: { slug: certificationSlug },
      select: { id: true, isActive: true }
    });

    if (!certification || !certification.isActive) {
      return NextResponse.json(
        { error: 'Certification not found or inactive' },
        { status: 404 }
      );
    }

    // Create the enrollment record
    const enrollment = await prisma.certificationEnrollment.create({
      data: {
        certificationId: certification.id,
        ...enrollmentData,
        status: 'pending'
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Enrollment submitted successfully',
      id: enrollment.id
    });

  } catch (error) {
    console.error('Error submitting certification enrollment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
