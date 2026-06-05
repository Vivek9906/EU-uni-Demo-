'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function guard() {
  const s = await getServerSession(authOptions)
  if (!s?.user) throw new Error('Unauthorized')
}

export async function createPartner(data: {
  name: string
  address: string
  region: string
  country: string
  website?: string
  email?: string
  isActive?: boolean
  order?: number
}) {
  await guard()
  try {
    const partner = await prisma.partner.create({ data })
    revalidatePath('/dashboard/partners')
    revalidatePath('/partners')
    return { success: true, partner }
  } catch (err) {
    console.error('[ADMIN][partners] create failed:', err)
    return { success: false, error: 'Failed to create partner' }
  }
}

export async function updatePartner(id: string, data: {
  name?: string
  address?: string
  region?: string
  country?: string
  website?: string
  email?: string
  isActive?: boolean
  order?: number
}) {
  await guard()
  try {
    const partner = await prisma.partner.update({ where: { id }, data })
    revalidatePath('/dashboard/partners')
    revalidatePath('/partners')
    return { success: true, partner }
  } catch (err) {
    console.error('[ADMIN][partners] update failed:', err)
    return { success: false, error: 'Failed to update partner' }
  }
}

export async function deletePartner(id: string) {
  await guard()
  try {
    await prisma.partner.delete({ where: { id } })
    revalidatePath('/dashboard/partners')
    revalidatePath('/partners')
    return { success: true }
  } catch (err) {
    console.error('[ADMIN][partners] delete failed:', err)
    return { success: false, error: 'Failed to delete partner' }
  }
}
