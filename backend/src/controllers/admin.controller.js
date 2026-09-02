import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';
import { env } from '../config/env.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import * as validators from '../validators/admin.validator.js';

export const login = catchAsync(async (req, res) => {
  const data = validators.adminLoginSchema.parse(req.body);
  
  const admin = await prisma.admin.findUnique({
    where: { email: data.email }
  });

  if (!admin || !admin.active) {
    // Return generic error to prevent user enumeration
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  const isValidPassword = await bcrypt.compare(data.password, admin.passwordHash);
  if (!isValidPassword) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() }
  });

  const token = jwt.sign(
    { adminId: admin.id, role: admin.role },
    env.JWT_SECRET,
    { expiresIn: '1d' } // 1 day expiry, no unlimited tokens
  );

  res.json({
    success: true,
    data: {
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    }
  });
});

export const updateBusinessSettings = catchAsync(async (req, res) => {
  const data = validators.updateBusinessSchema.parse(req.body);

  const existingSettings = await prisma.businessSettings.findFirst();
  let settings;
  if (existingSettings) {
    settings = await prisma.businessSettings.update({
      where: { id: existingSettings.id },
      data
    });
  } else {
    settings = await prisma.businessSettings.create({
      data: {
        ...data,
        name: data.name || 'Naturals Salon'
      }
    });
  }

  res.json({ success: true, data: settings });
});

export const addGalleryImage = catchAsync(async (req, res) => {
  const data = validators.galleryItemSchema.parse(req.body);
  
  // ensure serviceId exists if provided
  if (data.serviceId) {
    const service = await prisma.service.findUnique({ where: { id: data.serviceId }});
    if (!service) {
      throw new AppError('Service not found', 400, 'INVALID_SERVICE');
    }
  }

  const image = await prisma.galleryImage.create({ data });
  res.status(201).json({ success: true, data: image });
});

export const updateFeedbackStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = validators.updateFeedbackStatusSchema.parse(req.body);

  const feedback = await prisma.feedback.findUnique({ where: { id }});
  if (!feedback) throw new AppError('Feedback not found', 404, 'NOT_FOUND');

  const updatedFeedback = await prisma.feedback.update({
    where: { id },
    data: { status: data.status }
  });
  res.json({ success: true, data: updatedFeedback });
});

export const getAppointments = catchAsync(async (req, res) => {
  const { page, limit } = validators.paginationSchema.parse(req.query);
  const skip = (page - 1) * limit;

  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { service: { select: { name: true } } }
    }),
    prisma.appointment.count()
  ]);

  res.json({
    success: true,
    data: appointments,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
  });
});

export const updateAppointmentStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = validators.updateAppointmentStatusSchema.parse(req.body);

  const appointment = await prisma.appointment.findUnique({ where: { id } });
  if (!appointment) throw new AppError('Appointment not found', 404, 'NOT_FOUND');

  const updated = await prisma.$transaction(async (tx) => {
    const appt = await tx.appointment.update({
      where: { id },
      data: { status: data.status }
    });
    
    await tx.appointmentStatusHistory.create({
      data: {
        appointmentId: id,
        fromStatus: appointment.status,
        toStatus: data.status,
        changedByAdminId: req.admin.id,
        note: data.note
      }
    });

    return appt;
  });

  res.json({ success: true, data: updated });
});
