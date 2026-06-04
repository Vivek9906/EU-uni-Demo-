'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function guard() {
  const s = await getServerSession(authOptions)
  if (!s?.user) throw new Error('Unauthorized')
}

export async function createCertification(data: {
  title: string
  slug: string
  category: string
  description: string
  imageUrl?: string
  isBundle?: boolean
  isActive?: boolean
  order?: number
}) {
  await guard()
  try {
    const cert = await prisma.certification.create({
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        description: data.description || '',
        imageUrl: data.imageUrl || '',
        isBundle: data.isBundle ?? false,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
    })
    revalidatePath('/dashboard/certifications')
    revalidatePath('/certifications')
    return { success: true, certification: { ...cert, createdAt: cert.createdAt.toISOString() } }
  } catch (err) {
    console.error('[ADMIN][certifications] create failed:', err)
    return { success: false, error: 'Failed to create certification' }
  }
}

export async function updateCertification(id: string, data: {
  title?: string
  slug?: string
  category?: string
  description?: string
  imageUrl?: string
  isBundle?: boolean
  isActive?: boolean
  order?: number
}) {
  await guard()
  try {
    const cert = await prisma.certification.update({ where: { id }, data })
    revalidatePath('/dashboard/certifications')
    revalidatePath('/certifications')
    return { success: true, certification: { ...cert, createdAt: cert.createdAt.toISOString() } }
  } catch (err) {
    console.error('[ADMIN][certifications] update failed:', err)
    return { success: false, error: 'Failed to update certification' }
  }
}

export async function deleteCertification(id: string) {
  await guard()
  try {
    await prisma.certification.delete({ where: { id } })
    revalidatePath('/dashboard/certifications')
    revalidatePath('/certifications')
    return { success: true }
  } catch (err) {
    console.error('[ADMIN][certifications] delete failed:', err)
    return { success: false, error: 'Failed to delete certification' }
  }
}

export async function toggleCertificationActive(id: string, isActive: boolean) {
  await guard()
  try {
    await prisma.certification.update({ where: { id }, data: { isActive } })
    revalidatePath('/dashboard/certifications')
    revalidatePath('/certifications')
    return { success: true }
  } catch (err) {
    console.error('[ADMIN][certifications] toggle failed:', err)
    return { success: false, error: 'Failed to toggle certification' }
  }
}
