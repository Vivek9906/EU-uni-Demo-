import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendNewsletterConfirmation } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Check if exists
    const existing = await prisma.subscriber.findUnique({
      where: { email }
    });

    if (!existing) {
      await prisma.subscriber.create({
        data: { email }
      });
    }

    try {
      // Send confirmation email to the subscriber
      await sendNewsletterConfirmation(email);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (emailError: any) {
      console.error('Email sending failed:', emailError);
      return NextResponse.json({ error: 'Failed to send email: ' + emailError.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
