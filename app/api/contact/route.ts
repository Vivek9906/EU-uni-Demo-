import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { contactSchema } from '@/lib/validations/contact';
import { sanitizeInput } from '@/lib/utils';
import { checkRateLimit, RATE_LIMITS, getClientIp, rateLimitResponse } from '@/lib/rate-limit';
import { sendContactConfirmation, sendAdminNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`contact:${ip}`, RATE_LIMITS.contact);
    if (!rateCheck.allowed) return rateLimitResponse(rateCheck.resetIn);

    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ error: 'Validation failed', details: validationResult.error.flatten().fieldErrors }, { status: 400 });
    }

    const data = validationResult.data;
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        phone: data.phone ? sanitizeInput(data.phone) : '',
        subject: sanitizeInput(data.subject),
        message: sanitizeInput(data.message),
      },
    });

    sendContactConfirmation(inquiry.email, inquiry.name).catch(console.error);

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
