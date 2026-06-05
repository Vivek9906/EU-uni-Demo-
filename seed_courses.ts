import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding missing programs...');

  const programs = [
    { name: 'Bachelor of Public Administration', faculty: 'Public Administration', duration: '4 Years', degreeType: 'Bachelors', status: 'published' },
    { name: 'Bachelor of Social Work', faculty: 'Social Work', duration: '4 Years', degreeType: 'Bachelors', status: 'published' },
    { name: 'Master of Public Administration', faculty: 'Public Administration', duration: '2 Years', degreeType: 'Masters', status: 'published' },
    { name: 'Master of Social Work', faculty: 'Social Work', duration: '2 Years', degreeType: 'Masters', status: 'published' },
    { name: 'Honorary Professorship', faculty: 'Various', duration: 'Honorary', degreeType: 'Honorary', status: 'published' }
  ];

  for (const p of programs) {
    const existing = await prisma.program.findFirst({ where: { name: p.name } });
    if (!existing) {
      await prisma.program.create({ data: p });
      console.log(`✅ Created: ${p.name}`);
    } else {
      console.log(`ℹ️ Already exists: ${p.name}`);
    }
  }

  console.log('Done!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
