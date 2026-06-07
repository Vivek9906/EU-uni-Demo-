import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.program.updateMany({
    where: { slug: 'bachelor-of-arts-in-english-language' },
    data: { slug: 'bael' }
  });
  console.log('BAEL slug updated!');
}

main().finally(() => prisma.$disconnect());
