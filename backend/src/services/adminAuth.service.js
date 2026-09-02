import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';
import { env } from '../config/env.js';
import AppError from '../utils/AppError.js';

export const loginAdmin = async (email, password) => {
  const admin = await prisma.admin.findUnique({
    where: { email }
  });

  if (!admin) {
    throw new AppError('INVALID_CREDENTIALS', 'Invalid email or password.', 401);
  }

  if (!admin.active) {
    throw new AppError('ADMIN_INACTIVE', 'Admin account is inactive.', 403);
  }

  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

  if (!isPasswordValid) {
    throw new AppError('INVALID_CREDENTIALS', 'Invalid email or password.', 401);
  }

  // Update last login
  await prisma.admin.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() }
  });

  const token = jwt.sign(
    { adminId: admin.id, role: admin.role },
    env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  const { passwordHash, ...adminWithoutPassword } = admin;

  return {
    token,
    admin: adminWithoutPassword
  };
};

export const getMe = async (adminId) => {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId }
  });

  if (!admin) {
    throw new AppError('AUTH_REQUIRED', 'Admin not found', 404);
  }

  const { passwordHash, ...adminWithoutPassword } = admin;
  return adminWithoutPassword;
};
