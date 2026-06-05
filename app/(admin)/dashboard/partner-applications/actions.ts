'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function guard() {
  const s = await getServerSession(authOptions)
  if (!s?.user) throw new Error('Unauthorized')
  return s.user
}

export async function approveApplication(id: string) {
  const user = await guard()
  try {
    await prisma.partnerApplication.update({
      where: { id },
      data: { status: 'approved', reviewedAt: new Date(), reviewedBy: (user as any).id ?? user.name ?? 'admin' },
    })
    revalidatePath('/dashboard/partner-applications')
    return { success: true }
  } catch (err) {
    console.error('[ADMIN][partner-applications] approve failed:', err)
    return { success: false, error: 'Failed to approve' }
  }
}

export async function rejectApplication(id: string) {
  const user = await guard()
  try {
    await prisma.partnerApplication.update({
      where: { id },
      data: { status: 'rejected', reviewedAt: new Date(), reviewedBy: (user as any).id ?? user.name ?? 'admin' },
    })
    revalidatePath('/dashboard/partner-applications')
    return { success: true }
  } catch (err) {
    console.error('[ADMIN][partner-applications] reject failed:', err)
    return { success: false, error: 'Failed to reject' }
  }
}

export async function deleteApplication(id: string) {
  await guard()
  try {
    await prisma.partnerApplication.delete({ where: { id } })
    revalidatePath('/dashboard/partner-applications')
    return { success: true }
  } catch (err) {
    console.error('[ADMIN][partner-applications] delete failed:', err)
    return { success: false, error: 'Failed to delete' }
  }
}
