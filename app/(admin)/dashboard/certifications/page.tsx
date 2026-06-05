import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { CertificationsClient } from './CertificationsClient'

export default async function CertificationsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  let certifications: any[] = []
  try {
    certifications = await prisma.certification.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    })
  } catch (err) {
    console.error('[ADMIN][certifications] fetch failed:', err)
  }

  const serialized = certifications.map(c => ({
    ...c,
    createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt,
  }))

  return <CertificationsClient initialData={serialized} />
}
