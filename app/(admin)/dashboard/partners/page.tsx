import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { PartnersClient } from './PartnersClient'

export default async function PartnersPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  let partners: any[] = []
  try {
    partners = await prisma.partner.findMany({ orderBy: [{ region: 'asc' }, { order: 'asc' }] })
  } catch (err) {
    console.error('[ADMIN][partners] fetch failed:', err)
  }

  return <PartnersClient partners={partners.map(p => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))} />
}
