import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sanitizeInput } from '@/lib/utils';
import { sendStatusUpdateEmail } from '@/lib/email';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const application = await prisma.application.findUnique({ where: { id: params.id } });
    if (!application) return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    return NextResponse.json({ application });
  } catch (error) {
    console.error('Application fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { status, notes } = body;

    const application = await prisma.application.findUnique({ where: { id: params.id } });
    if (!application) return NextResponse.json({ error: 'Application not found' }, { status: 404 });

    const updateData: Record<string, string> = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = sanitizeInput(notes);

    const updated = await prisma.application.update({ where: { id: params.id }, data: updateData });

    if (status && status !== application.status) {
      sendStatusUpdateEmail(updated.email, updated.fullName, updated.referenceNumber, status, updated.programName).catch(console.error);
    }

    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    console.error('Application update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
