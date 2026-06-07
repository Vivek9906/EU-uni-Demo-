import { prisma } from '@/lib/db';
import ProgramsSection from '@/components/sections/ProgramsSection';

export default async function ProgramsSectionServer() {
  const dbPrograms = await prisma.program.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    select: {
      title: true,
      slug: true,
      level: true,
      description: true,
      imageUrl: true,
    },
  });

  return <ProgramsSection dbPrograms={dbPrograms} />;
}
