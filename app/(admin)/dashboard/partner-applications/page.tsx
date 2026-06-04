import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PartnerApplicationsClient } from './PartnerApplicationsClient'

export default async function PartnerApplicationsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  let applications: any[] = []
  try {
    applications = await prisma.partnerApplication.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (err) {
    console.error('[ADMIN][partner-applications] fetch failed:', err)
  }

  return <PartnerApplicationsClient applications={applications.map(a => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    reviewedAt: a.reviewedAt?.toISOString() ?? null,
  }))} />
}
