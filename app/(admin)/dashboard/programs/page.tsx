import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { ProgramsClient } from './ProgramsClient'

export default async function ProgramsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  let programs: any[] = []
  try {
    programs = await prisma.program.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (err) {
    console.error('[ADMIN][programs] DB fetch failed. This usually means your Prisma client is out of sync with your database schema. Please restart your Next.js dev server.', err)
  }

  const serialized = programs.map(p => ({
    ...p,
    createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
    updatedAt: p.updatedAt instanceof Date ? p.updatedAt.toISOString() : p.updatedAt,
  }))

  return <ProgramsClient initialData={serialized} />
}
