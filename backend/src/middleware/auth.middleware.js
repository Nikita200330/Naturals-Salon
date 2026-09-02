import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import prisma from '../config/db.js';
import { env } from '../config/env.js';

export const requireAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(
        'Authentication required',
        401,
        'AUTH_REQUIRED'
      );
    }

    const token = authHeader.split(' ')[1];

    let decoded;

    try {
      decoded = jwt.verify(token, env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new AppError(
          'Token expired',
          401,
          'TOKEN_EXPIRED'
        );
      }

      throw new AppError(
        'Invalid token',
        401,
        'AUTH_REQUIRED'
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId }
    });

    if (!admin) {
      throw new AppError(
        'Admin not found',
        401,
        'AUTH_REQUIRED'
      );
    }

    if (!admin.active) {
      throw new AppError(
        'Admin account is inactive',
        403,
        'ADMIN_INACTIVE'
      );
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};
