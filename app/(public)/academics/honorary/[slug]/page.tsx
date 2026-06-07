import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import DynamicProgramPage from '@/components/sections/DynamicProgramPage';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await prisma.program.findFirst({
    where: { slug, level: 'honorary', isActive: true },
  });

  if (!program) return {};

  return {
    title: program.title,
    description: `${program.title} at EU American University — ${program.description}`,
  };
}

export default async function DynamicHonoraryPage({ params }: Props) {
  const { slug } = await params;
  const program = await prisma.program.findFirst({
    where: { slug, level: 'honorary', isActive: true },
  });

  if (!program) notFound();

  return <DynamicProgramPage program={program} />;
}
