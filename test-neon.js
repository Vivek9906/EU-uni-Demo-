const { PrismaClient } = require('@prisma/client');

async function testConnection(url, name) {
  console.log(`\n--- Testing ${name} ---`);
  console.log(`URL: ${url}`);
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: url
      }
    }
  });

  const startTime = Date.now();
  try {
    const res = await prisma.$queryRaw`SELECT 1 as result`;
    const duration = Date.now() - startTime;
    console.log(`✅ Success for ${name} in ${duration}ms! Result:`, res);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ Failed for ${name} after ${duration}ms:`, error.message);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const pooledUrl = process.env.DATABASE_URL;
  const directUrl = process.env.DATABASE_POSTGRES_URL_NON_POOLING;

  await testConnection(pooledUrl, "Pooled Connection (-pooler)");
  await testConnection(directUrl, "Direct Connection (Non-pooling)");
}

main().catch(console.error);
