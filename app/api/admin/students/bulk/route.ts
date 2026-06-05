import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import * as XLSX from 'xlsx';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Parse the sheet to JSON
    const data = XLSX.utils.sheet_to_json(sheet) as any[];

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'File is empty or invalid format' }, { status: 400 });
    }

    // Process and validate rows
    const students = data.map((row) => ({
      fullName: row.fullName || 'Unknown Student',
      email: row.email || `student_${Math.random().toString(36).substring(7)}@example.com`,
      programName: row.programName || 'Unknown Program',
      programLevel: row.programLevel || 'Bachelors',
      enrollmentYear: parseInt(row.enrollmentYear) || new Date().getFullYear(),
      status: row.status || 'active',
      enrollmentId: `EUAU-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    }));

    // Perform bulk insert
    const created = await prisma.student.createMany({
      data: students,
    });

    return NextResponse.json({ success: true, count: created.count });
  } catch (error) {
    console.error('[STUDENT_BULK_UPLOAD]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
