import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import cloudinary from '@/lib/cloudinary'

export const runtime = 'nodejs'

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { publicId } = await req.json()
    if (!publicId) {
      return NextResponse.json({ error: 'No publicId provided' }, { status: 400 })
    }

    await cloudinary.uploader.destroy(publicId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[DELETE ERROR]', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
