import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 'site_settings' } });
    return NextResponse.json({ settings: settings?.data || {} });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'site_settings' },
      update: { data: body },
      create: { id: 'site_settings', data: body },
    });
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
