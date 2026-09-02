import * as adminAuthService from '../services/adminAuth.service.js';
import { loginSchema } from '../validators/admin.validator.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

export const login = catchAsync(async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError('INVALID_INPUT', result.error.errors[0].message, 400);
  }

  const { email, password } = result.data;
  const data = await adminAuthService.loginAdmin(email, password);

  res.status(200).json({
    success: true,
    data
  });
});

export const getMe = catchAsync(async (req, res) => {
  const adminId = req.admin.id;
  const admin = await adminAuthService.getMe(adminId);

  res.status(200).json({
    success: true,
    data: {
      admin
    }
  });
});
