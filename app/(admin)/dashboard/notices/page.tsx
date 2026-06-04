import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { NoticesClient } from './NoticesClient'

export default async function NoticesPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  let notices: any[] = []
  try {
    notices = await prisma.notice.findMany({
      orderBy: { postedAt: 'desc' },
    })
  } catch (err) {
    console.error('[ADMIN][notices] DB fetch failed:', err)
  }

  // CRITICAL: Serialize all Date objects
  const serialized = notices.map(n => ({
    ...n,
    postedAt:  n.postedAt  instanceof Date ? n.postedAt.toISOString()  : n.postedAt,
    updatedAt: n.updatedAt instanceof Date ? n.updatedAt.toISOString() : n.updatedAt,
  }))

  return <NoticesClient initialData={serialized} />
}
