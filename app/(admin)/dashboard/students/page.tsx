import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';
import { StudentsClientPage } from './StudentsClientPage';
import { PageHeader } from '@/components/admin/PageHeader';

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; status?: string; level?: string };
}) {
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

  const [students, total] = await prisma.$transaction([
    prisma.student.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.student.count({ where }),
  ]);

  return (
    <>
      <PageHeader
        title="Students"
        description="Manage student records, enrollments, and statuses."
      />
      <StudentsClientPage students={students} total={total} page={page} limit={limit} />
    </>
  );
}
