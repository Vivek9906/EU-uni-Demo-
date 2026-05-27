import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { certificateVerifySchema } from '@/lib/validations/contact';
import { checkRateLimit, RATE_LIMITS, getClientIp, rateLimitResponse } from '@/lib/rate-limit';
import { formatDate } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`cert-verify:${ip}`, RATE_LIMITS.certificateVerify);
    if (!rateCheck.allowed) return rateLimitResponse(rateCheck.resetIn);

    const body = await request.json();
    const validationResult = certificateVerifySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ error: 'Invalid certificate ID' }, { status: 400 });
    }

    const certificate = await prisma.certificate.findUnique({
      where: { certificateId: validationResult.data.certificateId },
    });

    if (!certificate) {
      return NextResponse.json({ found: false });
    }

    return NextResponse.json({
      found: true,
      data: {
        certificateId: certificate.certificateId,
        holderName: certificate.holderName,
        programName: certificate.programName,
        issuedDate: formatDate(certificate.issuedDate),
        isValid: certificate.isValid,
      },
    });
  } catch (error) {
    console.error('Certificate verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
