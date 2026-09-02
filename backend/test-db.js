import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const count = await prisma.service.count();
  console.log('Total services:', count);
}
main();
