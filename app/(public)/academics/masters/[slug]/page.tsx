import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';
import DynamicProgramPage from '@/components/sections/DynamicProgramPage';
import { PROGRAMS } from '@/lib/programs';

type Props = {
  params: Promise<{ slug: string }>;
};

const getCachedProgram = (slug: string) =>
  unstable_cache(
    async () => {
      return prisma.program.findFirst({
        where: { slug, level: 'masters', isActive: true },
        select: {
          id: true,
          title: true,
          slug: true,
          level: true,
          description: true,
          imageUrl: true,
          order: true,
        },
      });
    },
    [`program-masters-detail-${slug}`],
    { revalidate: 3600, tags: ['programs'] }
  );

export async function generateStaticParams() {
  return PROGRAMS.masters.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getCachedProgram(slug)();

  if (!program) return {};

  return {
    title: program.title,
    description: `${program.title} at EU American University — ${program.description}`,
  };
}

export default async function DynamicMastersPage({ params }: Props) {
  const { slug } = await params;
  const program = await getCachedProgram(slug)();

  if (!program) notFound();

  return <DynamicProgramPage program={program} />;
}
