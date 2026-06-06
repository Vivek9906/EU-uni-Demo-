import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { NoticeFormClient } from '../NoticeFormClient'

export default async function NewNoticePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')
  return <NoticeFormClient mode="create" />
}
