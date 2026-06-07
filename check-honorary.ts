import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const programs = await prisma.program.findMany({
    where: { level: 'honorary' }
  });
  console.log(programs);
}

main().finally(() => prisma.$disconnect());
