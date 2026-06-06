import { NextResponse } from 'next/server'
import { seedDatabase } from '@/prisma/seed'

export async function GET() {
  try {
    await seedDatabase()
    return NextResponse.json({ success: true, message: 'Database seeded successfully on Vercel!' })
  } catch (error) {
    console.error('Seed API error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
