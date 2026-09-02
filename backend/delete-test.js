import prisma from './src/config/db.js';
async function main() {
  const services = await prisma.service.findMany({
    where: {
      name: {
        contains: 'Test Cut'
      }
    }
  });
  
  for (const s of services) {
    await prisma.appointment.deleteMany({
      where: {
        serviceId: s.id
      }
    });
  }

  await prisma.service.deleteMany({
    where: {
      name: {
        contains: 'Test Cut'
      }
    }
  });
  const count = await prisma.service.count();
  console.log('Total services after cleanup:', count);
}
main();
