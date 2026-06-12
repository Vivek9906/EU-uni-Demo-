const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.student.count();
    console.log("Total students in DB:", count);
    
    const students = await prisma.student.findMany();
    console.log("Students:", students);
  } catch (error) {
    console.error("Prisma error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
