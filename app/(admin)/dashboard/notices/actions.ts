'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function guard() {
  const s = await getServerSession(authOptions)
  if (!s?.user) throw new Error('Unauthorized')
}

export async function createNotice(data: {
  title: string
  content: string
  category: string
  isActive: boolean
}) {
  await guard()
  try {
    const notice = await prisma.notice.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category || 'general',
        isActive: data.isActive ?? true,
      },
    })
    revalidatePath('/dashboard/notices')
    revalidatePath('/')

    if (notice.isActive) {
      try {
        const subscribers = await prisma.subscriber.findMany({
          where: { isActive: true },
          select: { email: true }
        });
        const emails = subscribers.map(s => s.email);
        if (emails.length > 0) {
          const { sendBroadcastEmail } = await import('@/lib/email');
          sendBroadcastEmail(
            emails, 
            `Notice: ${notice.title}`, 
            notice.title, 
            notice.content.substring(0, 150) + '...', 
            undefined, // No direct link for notices in the basic schema, they are usually on the homepage
            ''
          ).catch(console.error);
        }
      } catch (err) {
        console.error("Failed to broadcast notice:", err);
      }
    }

    return { success: true, notice: { ...notice, postedAt: notice.postedAt.toISOString(), updatedAt: notice.updatedAt.toISOString() } }
  } catch (err) {
    console.error('[ADMIN][notices] create failed:', err)
    return { success: false, error: 'Failed to create notice' }
  }
}

export async function updateNotice(id: string, data: {
  title?: string
  content?: string
  category?: string
  isActive?: boolean
}) {
  await guard()
  try {
    const notice = await prisma.notice.update({
      where: { id },
      data,
    })
    revalidatePath('/dashboard/notices')
    revalidatePath('/')
    return { success: true, notice: { ...notice, postedAt: notice.postedAt.toISOString(), updatedAt: notice.updatedAt.toISOString() } }
  } catch (err) {
    console.error('[ADMIN][notices] update failed:', err)
    return { success: false, error: 'Failed to update notice' }
  }
}

export async function deleteNotice(id: string) {
  await guard()
  try {
    await prisma.notice.delete({ where: { id } })
    revalidatePath('/dashboard/notices')
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    console.error('[ADMIN][notices] delete failed:', err)
    return { success: false, error: 'Failed to delete notice' }
  }
}

export async function toggleNoticeActive(id: string, isActive: boolean) {
  await guard()
  try {
    await prisma.notice.update({ where: { id }, data: { isActive } })
    revalidatePath('/dashboard/notices')
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    console.error('[ADMIN][notices] toggle failed:', err)
    return { success: false, error: 'Failed to toggle notice' }
  }
}
