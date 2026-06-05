export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { applicationSchema } from '@/lib/validations/application';
import { generateReferenceNumber, sanitizeInput } from '@/lib/utils';
import { checkRateLimit, RATE_LIMITS, getClientIp, rateLimitResponse } from '@/lib/rate-limit';
import { sendAdminNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`application:${ip}`, RATE_LIMITS.application);
    if (!rateCheck.allowed) return rateLimitResponse(rateCheck.resetIn);

    const body = await request.json();

    // Server-side validation
    const validationResult = applicationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Sanitize text inputs
    const sanitizedData = {
      fullName: sanitizeInput(data.fullName),
      dateOfBirth: new Date(data.dateOfBirth),
      gender: data.gender,
      nationality: sanitizeInput(data.nationality),
      passportNumber: sanitizeInput(data.passportNumber),
      email: sanitizeInput(data.email),
      phone: sanitizeInput(data.phone),
      currentAddress: sanitizeInput(data.currentAddress),
      mailingAddress: data.mailingAddress ? sanitizeInput(data.mailingAddress) : '',
      programLevel: data.programLevel,
      programName: sanitizeInput(data.programName),
      modeOfStudy: data.modeOfStudy,
      intendedStart: data.intendedStart,
      highestQualification: sanitizeInput(data.highestQualification),
      institutionName: sanitizeInput(data.institutionName),
      graduationYear: sanitizeInput(data.graduationYear),
      transcriptsUrls: "{}",
      currentJobTitle: data.currentJobTitle ? sanitizeInput(data.currentJobTitle) : '',
      employer: data.employer ? sanitizeInput(data.employer) : '',
      yearsExperience: data.yearsExperience || '',
      cvUrl: '',
      statementOfPurpose: sanitizeInput(data.statementOfPurpose),
      referenceName: data.referenceName ? sanitizeInput(data.referenceName) : '',
      referenceEmail: data.referenceEmail || '',
      referenceRelationship: data.referenceRelationship ? sanitizeInput(data.referenceRelationship) : '',
      confirmAccuracy: data.confirmAccuracy,
      agreeTerms: data.agreeTerms,
      consentContact: data.consentContact,
      referenceNumber: generateReferenceNumber('EUAU'),
    };

    // Create application in database
    const application = await prisma.application.create({
      data: sanitizedData,
    });

    // Send tailored confirmation email (non-blocking)
    if (application.programLevel === 'certification') {
      const { sendCertificateApplicationEmail } = await import('@/lib/email');
      sendCertificateApplicationEmail(
        application.email,
        application.fullName,
        application.referenceNumber,
        application.programName
      ).catch(console.error);
    } else {
      const { sendProgramApplicationEmail } = await import('@/lib/email');
      sendProgramApplicationEmail(
        application.email,
        application.fullName,
        application.referenceNumber,
        application.programName
      ).catch(console.error);
    }

    // Send admin notification (non-blocking)
    sendAdminNotification(
      `New Application: ${application.referenceNumber}`,
      `<p><strong>Name:</strong> ${application.fullName}</p><p><strong>Program:</strong> ${application.programName}</p><p><strong>Email:</strong> ${application.email}</p><p><strong>Reference:</strong> ${application.referenceNumber}</p>`
    ).catch(console.error);

    return NextResponse.json({
      success: true,
      referenceNumber: application.referenceNumber,
      message: 'Application submitted successfully.',
    }, { status: 201 });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Admin only — check auth header in production
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where = status ? { status } : {};
    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        orderBy: { submittedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.application.count({ where }),
    ]);

    return NextResponse.json({ applications, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Application fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
