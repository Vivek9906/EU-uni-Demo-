'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function guard() {
  const s = await getServerSession(authOptions)
  if (!s?.user) throw new Error('Unauthorized')
}

export async function createProgram(data: {
  title: string
  slug: string
  level: string
  description: string
  imageUrl?: string
  isActive?: boolean
  order?: number
}) {
  await guard()
  try {
    const program = await prisma.program.create({
      data: {
        title: data.title,
        slug: data.slug,
        level: data.level,
        description: data.description,
        imageUrl: data.imageUrl,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      },
    })
    revalidatePath('/dashboard/programs')
    revalidatePath('/academics')
    revalidatePath('/academics/bachelors')
    revalidatePath('/academics/masters')
    revalidatePath('/academics/phd')
    revalidatePath('/academics/honorary')
    revalidatePath(`/academics/${data.level}/${data.slug}`)
    return { success: true, program: { ...program, createdAt: program.createdAt.toISOString(), updatedAt: program.updatedAt.toISOString() } }
  } catch (err) {
    console.error('[ADMIN][programs] create failed:', err)
    return { success: false, error: 'Failed to create program' }
  }
}

export async function updateProgram(id: string, data: {
  title?: string
  slug?: string
  level?: string
  description?: string
  imageUrl?: string
  isActive?: boolean
  order?: number
}) {
  await guard()
  try {
    const program = await prisma.program.update({ where: { id }, data })
    revalidatePath('/dashboard/programs')
    revalidatePath('/academics')
    revalidatePath('/academics/bachelors')
    revalidatePath('/academics/masters')
    revalidatePath('/academics/phd')
    revalidatePath('/academics/honorary')
    revalidatePath(`/academics/${program.level}/${program.slug}`)
    return { success: true, program: { ...program, createdAt: program.createdAt.toISOString(), updatedAt: program.updatedAt.toISOString() } }
  } catch (err) {
    console.error('[ADMIN][programs] update failed:', err)
    return { success: false, error: 'Failed to update program' }
  }
}

export async function deleteProgram(id: string) {
  await guard()
  try {
    await prisma.program.delete({ where: { id } })
    revalidatePath('/dashboard/programs')
    revalidatePath('/academics')
    revalidatePath('/academics/bachelors')
    revalidatePath('/academics/masters')
    revalidatePath('/academics/phd')
    revalidatePath('/academics/honorary')
    return { success: true }
  } catch (err) {
    console.error('[ADMIN][programs] delete failed:', err)
    return { success: false, error: 'Failed to delete program' }
  }
}
