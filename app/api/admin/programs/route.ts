export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const programs = await prisma.program.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(programs);
  } catch (error) {
    console.error('Failed to fetch programs:', error);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const program = await prisma.program.create({
      data: {
        name: body.name,
        faculty: body.faculty,
        duration: body.duration,
        degreeType: body.degreeType,
        status: body.status || 'Published',
      },
    });

    if (program.status === 'Published') {
      try {
        const subscribers = await prisma.subscriber.findMany({
          where: { isActive: true },
          select: { email: true }
        });
        const emails = subscribers.map(s => s.email);
        if (emails.length > 0) {
          const { sendBroadcastEmail } = await import('@/lib/email');
          // Programs usually don't have a unique slug in the basic schema, just a name
          sendBroadcastEmail(
            emails, 
            `New Program: ${program.name}`, 
            program.name, 
            `We are excited to announce a new program: ${program.name} (${program.degreeType}) offered by the ${program.faculty}.`, 
            `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/academics`, 
            'Explore Programs'
          ).catch(console.error);
        }
      } catch (err) {
        console.error("Failed to broadcast program:", err);
      }
    }

    return NextResponse.json(program);
  } catch (error) {
    console.error('Failed to create program:', error);
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}

