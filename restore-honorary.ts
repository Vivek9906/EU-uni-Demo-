import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.program.upsert({
    where: { slug: 'honorary-doctorate' },
    update: { title: 'Honorary Doctorate (Honoris Causa)' },
    create: {
      title: 'Honorary Doctorate (Honoris Causa)',
      slug: 'honorary-doctorate',
      level: 'honorary',
      description: 'Conferred upon exceptional individuals whose lifelong contributions have significantly advanced their field and inspired others globally.',
      imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
      isActive: true,
      order: 2
    }
  });

  await prisma.program.upsert({
    where: { slug: 'honorary-professorship' },
    update: {},
    create: {
      title: 'Honorary Professorship',
      slug: 'honorary-professorship',
      level: 'honorary',
      description: 'Recognizes distinguished educators and scholars whose academic contributions merit the highest institutional recognition.',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
      isActive: true,
      order: 2
    }
  });
  console.log('Honorary programs restored!');
}

main().finally(() => prisma.$disconnect());
