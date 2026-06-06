import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { CertificateFormClient } from '../CertificateFormClient'

export default async function NewCertificatePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')
  return <CertificateFormClient mode="create" />
}
