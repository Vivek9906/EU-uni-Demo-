import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db';
import { sendContactConfirmation, sendAdminNotification } from '@/lib/email';

const schema = z.object({
  name: z.string().min(2).max(100),
  organization: z.string().min(2).max(200),
  email: z.string().email(),
  phone: z.string().max(50).optional().default(''),
  country: z.string().max(100).optional().default(''),
  partnershipType: z.string().max(100).optional().default(''),
  message: z.string().max(2000).optional().default(''),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Save to database
    const application = await prisma.partnerApplication.create({
      data: {
        name: data.name,
        organization: data.organization,
        email: data.email,
        phone: data.phone,
        country: data.country,
        partnershipType: data.partnershipType,
        message: data.message,
      },
    });

    // Send confirmation to the applicant
    sendContactConfirmation(data.email, data.name).catch(console.error);

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Partner enquiry error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
