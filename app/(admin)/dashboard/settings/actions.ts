'use server'

import { prisma } from '@/lib/db'
import { revalidatePath, revalidateTag } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function guard() {
  const s = await getServerSession(authOptions)
  if (!s?.user) throw new Error('Unauthorized')
}

export async function toggleMaintenanceMode(isActive: boolean, message?: string) {
  await guard()
  try {
    await prisma.systemSettings.upsert({
      where: { id: 'system_settings' },
      update: {
        isMaintenanceMode: isActive,
        ...(message ? { maintenanceMessage: message } : {}),
      },
      create: {
        id: 'system_settings',
        isMaintenanceMode: isActive,
        maintenanceMessage: message || "Website is currently under maintenance. We'll be back shortly.",
      },
    })
    revalidatePath('/')
    revalidatePath('/dashboard/settings')
    return { success: true }
  } catch (err) {
    console.error('[ADMIN][settings] toggle maintenance failed:', err)
    return { success: false, error: 'Failed to toggle maintenance mode' }
  }
}

export async function getSystemSettings() {
  try {
    const settings = await prisma.systemSettings.findUnique({ where: { id: 'system_settings' } })
    return settings ?? { id: 'system_settings', isMaintenanceMode: false, maintenanceMessage: "Website is currently under maintenance. We'll be back shortly." }
  } catch {
    return { id: 'system_settings', isMaintenanceMode: false, maintenanceMessage: "Website is currently under maintenance. We'll be back shortly." }
  }
}
