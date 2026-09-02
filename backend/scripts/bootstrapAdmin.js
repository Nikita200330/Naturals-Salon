import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const name = process.env.ADMIN_NAME || 'Super Admin';
  const rawPassword = process.env.ADMIN_INITIAL_PASSWORD;

  if (!rawPassword) {
    console.error('ADMIN_INITIAL_PASSWORD must be provided via environment variables.');
    process.exit(1);
  }

  // Idempotent creation
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin account ${email} already exists.`);
    return;
  }

  const passwordHash = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.admin.create({
    data: {
      email,
      name,
      passwordHash,
      role: 'ADMIN'
    }
  });

  console.log(`Successfully created admin account for ${email}.`);
  console.log('IMPORTANT: Keep your initial password secure or change it upon login.');
}

main()
  .catch((e) => {
    console.error('Error creating admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
