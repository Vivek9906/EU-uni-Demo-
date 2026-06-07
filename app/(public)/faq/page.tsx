import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about EU American University programs, admissions, and more.',
};

export const dynamic = 'force-dynamic';

export default async function FAQPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  return <FAQClient faqs={faqs} />;
}
