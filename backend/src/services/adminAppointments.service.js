import prisma from '../config/db.js';
import AppError from '../utils/AppError.js';
import { env } from '../config/env.js';
import { addMinutes, isOverlap } from '../utils/salonTime.js';

export const getAppointments = async (filters, page, limit) => {
  const { status, date, serviceId, search } = filters;
  const skip = (page - 1) * limit;

  const where = {};
  
  if (status) {
    where.status = status;
  }
  
  if (date) {
    where.preferredDate = new Date(date);
  }
  
  if (serviceId) {
    where.serviceId = serviceId;
  }
  
  if (search) {
    where.OR = [
      { customerName: { contains: search, mode: 'insensitive' } },
      { mobile: { contains: search, mode: 'insensitive' } }
    ];
  }

  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      include: {
        service: {
          select: { name: true, id: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    }),
    prisma.appointment.count({ where })
  ]);

  return {
    appointments,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getAppointmentById = async (id) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      service: {
        select: { name: true, id: true, durationMinutes: true }
      },
      statusHistory: {
        orderBy: { createdAt: 'desc' },
        include: {
          changedByAdmin: { select: { name: true } }
        }
      }
    }
  });

  if (!appointment) {
    throw new AppError('APPOINTMENT_NOT_FOUND', 'Appointment not found', 404);
  }

  return appointment;
};

export const updateAppointmentStatus = async (id, status, adminId) => {
  const appointment = await getAppointmentById(id);
  const currentStatus = appointment.status;

  const allowedTransitions = {
    PENDING: ['CONFIRMED', 'REJECTED', 'CANCELLED'],
    CONFIRMED: ['COMPLETED', 'CANCELLED'],
    REJECTED: [],
    CANCELLED: [],
    COMPLETED: []
  };

  if (!allowedTransitions[currentStatus]?.includes(status)) {
    throw new AppError('INVALID_APPOINTMENT_STATUS_TRANSITION', `Cannot transition from ${currentStatus} to ${status}`, 409);
  }

  if (status === 'CONFIRMED') {
    // Conflict check
    const slotInterval = env.APPOINTMENT_SLOT_INTERVAL_MINUTES;
    const isSlotBased = slotInterval && appointment.service.durationMinutes;

    const existingAppointments = await prisma.appointment.findMany({
      where: {
        id: { not: id },
        preferredDate: appointment.preferredDate,
        status: { in: ['PENDING', 'CONFIRMED'] }
      },
      include: {
        service: { select: { durationMinutes: true } }
      }
    });

    let hasConflict = false;
    
    if (!isSlotBased) {
      // Basic time string match
      hasConflict = existingAppointments.some(app => app.preferredTime === appointment.preferredTime);
    } else {
      // Interval match
      const reqStart = appointment.preferredTime;
      const reqEnd = addMinutes(reqStart, appointment.service.durationMinutes);
      
      for (const app of existingAppointments) {
        const appStart = app.preferredTime;
        const appEnd = app.service?.durationMinutes 
          ? addMinutes(appStart, app.service.durationMinutes)
          : addMinutes(appStart, slotInterval);

        if (isOverlap(reqStart, reqEnd, appStart, appEnd)) {
          hasConflict = true;
          break;
        }
      }
    }

    if (hasConflict) {
      throw new AppError('APPOINTMENT_TIME_UNAVAILABLE', 'This appointment time is no longer available.', 409);
    }
  }

  const updatedAppointment = await prisma.$transaction(async (tx) => {
    const updated = await tx.appointment.update({
      where: { id },
      data: { status }
    });

    await tx.appointmentStatusHistory.create({
      data: {
        appointmentId: id,
        fromStatus: currentStatus,
        toStatus: status,
        changedByAdminId: adminId
      }
    });

    return updated;
  });

  return updatedAppointment;
};
