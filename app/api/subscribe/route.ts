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
      // Send confirmation email to the new subscriber
      await sendNewsletterConfirmation(email).catch(console.error);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
