import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const bachelors = await prisma.program.findMany({
    where: { level: 'bachelors' }
  });
  console.log(bachelors.map(p => ({ slug: p.slug, isActive: p.isActive, title: p.title })));
}

main().finally(() => prisma.$disconnect());
