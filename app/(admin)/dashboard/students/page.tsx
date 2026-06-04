import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { StudentsClientPage } from './StudentsClientPage';

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; status?: string; level?: string };
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const page = parseInt(searchParams?.page ?? '1');
  const search = searchParams?.search ?? '';
  const status = searchParams?.status ?? 'all';
  const level = searchParams?.level ?? 'all';
  const limit = 25;

  const where: Prisma.StudentWhereInput = {};
  if (status !== 'all') where.status = status;
  if (level !== 'all') where.programLevel = level;
  if (search) {
    where.OR = [
      { fullName: { contains: search } },
      { email: { contains: search } },
      { enrollmentId: { contains: search } },
      { programName: { contains: search } },
    ];
  }

  let students: any[] = [];
  let total = 0;
  try {
    [students, total] = await prisma.$transaction([
      prisma.student.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.student.count({ where }),
    ]);
  } catch (err) {
    console.error('[ADMIN][students] DB fetch failed:', err);
  }

  // CRITICAL: Serialize Date objects
  const serialized = students.map(s => ({
    ...s,
    createdAt: s.createdAt instanceof Date ? s.createdAt.toISOString() : s.createdAt,
    updatedAt: s.updatedAt instanceof Date ? s.updatedAt.toISOString() : s.updatedAt,
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Manage Students
        </h1>
        <p className="text-sm text-slate-500">Manage student records, enrollments, and statuses.</p>
      </div>
      
      <StudentsClientPage students={serialized} total={total} page={page} limit={limit} />
    </div>
  );
}

