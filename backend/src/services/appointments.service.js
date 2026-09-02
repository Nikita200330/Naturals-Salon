import prisma from '../config/db.js';
import AppError from '../utils/AppError.js';
import { isPastDate, isPastTimeToday, isWithinBusinessHours } from '../utils/salonTime.js';

export const createAppointment = async (data) => {
  const { customerName, mobile, serviceId, preferredDate, preferredTime, message } = data;

  // 1. Validate Date and Time Business Rules
  if (isPastDate(preferredDate)) {
    throw new AppError('Cannot book an appointment in the past', 400, 'VALIDATION_ERROR');
  }

  if (isPastTimeToday(preferredDate, preferredTime)) {
    throw new AppError('Cannot book an appointment for a past time today', 400, 'VALIDATION_ERROR');
  }

  if (!isWithinBusinessHours(preferredTime)) {
    throw new AppError('Appointments can only be booked during business hours (09:00 - 20:59)', 400, 'VALIDATION_ERROR');
  }

  // 2. Verify Service
  // Try to find by slug first, if not found then by id
  let service = await prisma.service.findUnique({
    where: { slug: serviceId }
  });

  if (!service) {
    service = await prisma.service.findUnique({
      where: { id: serviceId }
    });
  }

  if (!service) {
    throw new AppError('Selected service is unavailable.', 400, 'SERVICE_INVALID');
  }

  if (!service.active) {
    throw new AppError('Selected service is unavailable.', 400, 'SERVICE_INVALID');
  }

  // 3. Duplicate Request Protection
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const recentDuplicate = await prisma.appointment.findFirst({
    where: {
      mobile,
      serviceId: service.id,
      preferredDate: new Date(preferredDate), 
      preferredTime,
      createdAt: {
        gte: fiveMinutesAgo
      }
    }
  });

  if (recentDuplicate) {
    throw new AppError('A similar appointment request was submitted recently.', 409, 'DUPLICATE_APPOINTMENT_REQUEST');
  }

  // 4. Availability Check
  const { getAvailability } = await import('./availability.service.js');
  const availability = await getAvailability(preferredDate, service);
  
  if (availability.mode === 'preferred-time') {
    if (availability.blockedTimes.includes(preferredTime)) {
      throw new AppError('That preferred time is no longer available. Please choose another time.', 409, 'APPOINTMENT_TIME_UNAVAILABLE');
    }
  } else if (availability.mode === 'slot-based') {
    if (!availability.availableSlots.includes(preferredTime)) {
      throw new AppError('That preferred time is no longer available. Please choose another time.', 409, 'APPOINTMENT_TIME_UNAVAILABLE');
    }
  }

  // 5. Create the Appointment
  const appointment = await prisma.appointment.create({
    data: {
      customerName,
      mobile,
      serviceId: service.id,
      preferredDate: new Date(preferredDate),
      preferredTime,
      message,
      status: 'PENDING'
    },
    include: {
      service: {
        select: {
          slug: true,
          name: true
        }
      }
    }
  });

  // 6. Format return data
  return {
    id: appointment.id,
    status: appointment.status,
    customerName: appointment.customerName,
    mobile: appointment.mobile,
    service: {
      slug: appointment.service.slug,
      name: appointment.service.name
    },
    preferredDate, // Since we received it as YYYY-MM-DD
    preferredTime: appointment.preferredTime,
    message: appointment.message || '',
    createdAt: appointment.createdAt
  };
};
