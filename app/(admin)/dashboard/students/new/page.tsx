import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { StudentFormClient } from '../StudentFormClient'

export default async function NewStudentPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')
  return <StudentFormClient mode="create" />
}
