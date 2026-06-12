import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import cloudinary from '@/lib/cloudinary'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Convert File to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Check if Cloudinary is actually configured
    const isCloudinaryConfigured = 
      process.env.CLOUDINARY_CLOUD_NAME && 
      process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name';

    let secureUrl = '';
    let publicId = '';

    if (isCloudinaryConfigured) {
      // Upload to Cloudinary
      const result = await new Promise<{ secure_url: string; public_id: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: 'euau/students',
                resource_type: 'image',
                transformation: [
                  { width: 400, height: 400, crop: 'fill', gravity: 'face' },
                  { quality: 'auto', fetch_format: 'auto' },
                ],
              },
              (error, result) => {
                if (error || !result) reject(error ?? new Error('Upload failed'))
                else resolve(result as { secure_url: string; public_id: string })
              }
            )
            .end(buffer)
        }
      )
      secureUrl = result.secure_url;
      publicId = result.public_id;
    } else {
      // Fallback: Convert to Base64 data URI
      // This works in serverless environments (like Vercel) where the filesystem is read-only.
      const base64 = buffer.toString('base64');
      secureUrl = `data:${file.type};base64,${base64}`;
      publicId = `local-${Date.now()}`;
    }

    return NextResponse.json({ url: secureUrl, publicId: publicId })
  } catch (error) {
    console.error('[UPLOAD ERROR]', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
