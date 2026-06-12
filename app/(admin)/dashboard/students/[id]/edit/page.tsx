import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { StudentFormClient } from '../../StudentFormClient'

export default async function EditStudentPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const student = await prisma.student.findUnique({
    where: { id: params.id },
  })

  if (!student) {
    redirect('/dashboard/students')
  }

  // Serialize dates
  const serialized = {
    ...student,
    createdAt: student.createdAt.toISOString(),
    updatedAt: student.updatedAt.toISOString(),
  }

  return <StudentFormClient mode="edit" student={serialized} />
}
