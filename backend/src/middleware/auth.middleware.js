import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import prisma from '../config/db.js';
import { env } from '../config/env.js';

export const requireAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('AUTH_REQUIRED', 'Authentication required', 401);
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod');
      
      const admin = await prisma.admin.findUnique({
        where: { id: decoded.adminId }
      });

      if (!admin) {
        throw new AppError('AUTH_REQUIRED', 'Admin not found', 401);
      }

      if (!admin.active) {
        throw new AppError('ADMIN_INACTIVE', 'Admin account is inactive', 403);
      }

      req.admin = admin;
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new AppError('TOKEN_EXPIRED', 'Token expired', 401);
      }
      throw new AppError('AUTH_REQUIRED', 'Invalid token', 401);
    }
  } catch (error) {
    next(error);
  }
};
