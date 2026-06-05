export const dynamic = 'force-dynamic';
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

    if (status === 'accepted') {
      const existingStudent = await prisma.student.findFirst({
        where: { applicationId: params.id }
      });

      if (!existingStudent) {
        const year = new Date().getFullYear();
        let enrollmentId = '';
        let attempts = 0;
        let isUnique = false;
        
        while (!isUnique && attempts < 10) {
          const random = Math.floor(10000 + Math.random() * 90000);
          enrollmentId = `EUAU-${year}-${random}`;
          attempts++;
          const existing = await prisma.student.findUnique({ where: { enrollmentId } });
          if (!existing) isUnique = true;
        }
        
        if (!isUnique) throw new Error('Could not generate unique enrollment ID');

        await prisma.student.create({
          data: {
            enrollmentId,
            applicationId: updated.id,
            fullName: updated.fullName,
            email: updated.email,
            programName: updated.programName,
            programLevel: updated.programLevel,
            enrollmentYear: year,
            intendedStartDate: updated.intendedStart,
            status: 'enrolled',
            isPubliclyVisible: true,
          }
        });
      }
    }

    if (status && status !== application.status) {
      await sendStatusUpdateEmail(updated.email, updated.fullName, updated.referenceNumber, status, updated.programName).catch(console.error);
    }

    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    console.error('Application update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
