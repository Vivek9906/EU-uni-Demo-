const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clean() {
  const res = await prisma.subscriber.deleteMany({});
  console.log('Deleted subscribers:', res);
}

clean()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
