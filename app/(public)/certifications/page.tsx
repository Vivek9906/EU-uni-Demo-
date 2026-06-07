import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import CertificationsClient from './CertificationsClient';

export const metadata: Metadata = {
  title: 'Professional Certifications',
  description: 'Advance your career with industry-relevant certification programs from EU American University.',
};

export const dynamic = 'force-dynamic';

export default async function CertificationsPage() {
  const certifications = await prisma.certification.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  return <CertificationsClient certifications={certifications} />;
}
