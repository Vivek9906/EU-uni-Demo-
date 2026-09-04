import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about EU American University programs, admissions, and more.',
};

import { unstable_cache } from 'next/cache';

const getCachedFaqs = unstable_cache(
  async () => {
    return prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        question: true,
        answer: true,
        category: true,
        order: true,
      },
    });
  },
  ['faqs-list'],
  { revalidate: 300, tags: ['faqs'] }
);

export default async function FAQPage() {
  let faqs: any[] = [];
  try {
    faqs = await getCachedFaqs();
  } catch (error) {
    console.error('[FAQPage] DB error:', error);
  }

  return <FAQClient faqs={faqs} />;
}
