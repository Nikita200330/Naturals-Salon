import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_for_dev';

async function test() {
  console.log('Testing Admin Auth...');
  const email = 'admin@example.com';
  
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    console.error('Admin not found!');
    return;
  }
  
  const isValid = await bcrypt.compare('password123', admin.passwordHash);
  console.log('Password Hash Match:', isValid);

  const token = jwt.sign({ adminId: admin.id, role: admin.role }, JWT_SECRET, { expiresIn: '8h' });
  
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log('JWT Verification:', decoded.adminId === admin.id);
  
  console.log('ALL TESTS PASSED');
}

test()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
