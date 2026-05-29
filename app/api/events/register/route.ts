import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { checkRateLimit, RATE_LIMITS, getClientIp, rateLimitResponse } from '@/lib/rate-limit';
import * as z from 'zod';

const registerSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
});

// Since there is no explicit EventRegistration model, we will just simulate success
// or create a generic contact inquiry. For this implementation, we simulate success.

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`event-register:${ip}`, RATE_LIMITS.eventRegistration);

    if (!rateCheck.allowed) {
      return rateLimitResponse(rateCheck.resetIn);
    }

    const body = await request.json();
    const validatedData = registerSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validatedData.error.format() },
        { status: 400 }
      );
    }

    const { eventId, name, email } = validatedData.data;

    // Verify event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // In a real application, we would store this in an EventRegistration table.
    // For now, we'll store it as a ContactInquiry just to record it.
    await prisma.contactInquiry.create({
      data: {
        name: name,
        email: email,
        subject: `Event Registration: ${event.title}`,
        message: `System generated registration record for event ${eventId}`,
        status: 'unread'
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful'
    });

  } catch (error) {
    console.error('Error submitting event registration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
