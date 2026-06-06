import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ProgramFormClient } from '../ProgramFormClient'

export default async function NewProgramPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')
  return <ProgramFormClient mode="create" />
}
