import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const existingAppointments = await prisma.appointment.findMany({
    where: {
      preferredDate: new Date('2026-10-10'),
    }
  });
  console.log(existingAppointments);
}
run();
