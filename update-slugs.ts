import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.program.updateMany({
    where: { slug: 'bachelor-of-business-administration' },
    data: { slug: 'bba' }
  });
  await prisma.program.updateMany({
    where: { slug: 'bachelor-of-public-administration' },
    data: { slug: 'bpa' }
  });
  await prisma.program.updateMany({
    where: { slug: 'bachelor-of-social-work' },
    data: { slug: 'bsw' }
  });
  await prisma.program.updateMany({
    where: { slug: 'master-of-business-administration' },
    data: { slug: 'mba' }
  });
  await prisma.program.updateMany({
    where: { slug: 'master-of-public-administration' },
    data: { slug: 'mpa' }
  });
  await prisma.program.updateMany({
    where: { slug: 'master-of-social-work' },
    data: { slug: 'msw' }
  });
  console.log('Slugs updated!');
}

main().finally(() => prisma.$disconnect());
