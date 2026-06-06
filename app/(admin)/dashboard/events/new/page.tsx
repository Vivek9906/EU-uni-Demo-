import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { EventFormClient } from '../EventFormClient'

export default async function NewEventPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')
  return <EventFormClient mode="create" />
}
