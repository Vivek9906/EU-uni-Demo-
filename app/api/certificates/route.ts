import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateCertificateId } from '@/lib/utils';
import { sendCertificateNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { holderName, programName, applicationId, email } = body;

    if (!holderName || !programName) {
      return NextResponse.json({ error: 'Holder name and program name are required' }, { status: 400 });
    }

    const certificate = await prisma.certificate.create({
      data: {
        certificateId: generateCertificateId(),
        holderName,
        programName,
        issuedDate: new Date(),
        applicationId: applicationId || null,
      },
    });

    if (email) {
      sendCertificateNotification(email, holderName, certificate.certificateId, programName).catch(console.error);
    }

    return NextResponse.json({ success: true, certificate }, { status: 201 });
  } catch (error) {
    console.error('Certificate issuance error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ certificates });
  } catch (error) {
    console.error('Certificate fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
