import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import CertificationsClient from './CertificationsClient';

export const metadata: Metadata = {
  title: 'Professional Certifications',
  description: 'Advance your career with industry-relevant certification programs from EU American University.',
};

import { unstable_cache } from 'next/cache';

const getCachedCertifications = unstable_cache(
  async () => {
    return prisma.certification.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: {
        slug: true,
        title: true,
        category: true,
        description: true,
        imageUrl: true,
        isBundle: true,
      },
    });
  },
  ['certifications-list'],
  { revalidate: 300, tags: ['certifications'] }
);

export default async function CertificationsPage() {
  let certifications: any[] = [];
  try {
    certifications = await getCachedCertifications();
  } catch (error) {
    console.error('[CertificationsPage] DB error:', error);
  }

  return <CertificationsClient certifications={certifications} />;
}
