import prisma from '../config/db.js';
import { env } from '../config/env.js';
import {
  TIMEZONE,
  isPastDate,
  isToday,
  getCurrentSalonTime,
  addMinutes,
  isOverlap
} from '../utils/salonTime.js';

export const getAvailability = async (date, service) => {
  const businessHours = {
    open: '09:00',
    close: '21:00'
  };

  // If date is in the past, no availability
  if (isPastDate(date)) {
    return {
      date,
      service: { slug: service.slug, name: service.name },
      mode: 'preferred-time',
      timezone: TIMEZONE,
      businessHours,
      blockedTimes: [],
      message: 'Select a preferred time. Final availability is confirmed by the salon.'
    };
  }

  // Fetch relevant appointments (PENDING or CONFIRMED)
  // Only select appointments for the specified date and specific statuses.
  const appointments = await prisma.appointment.findMany({
    where: {
      preferredDate: new Date(date),
      status: { in: ['PENDING', 'CONFIRMED'] }
    },
    include: {
      service: {
        select: { durationMinutes: true }
      }
    }
  });

  const slotInterval = env.APPOINTMENT_SLOT_INTERVAL_MINUTES;

  // Decide mode
  const mode = (slotInterval && service.durationMinutes) ? 'slot-based' : 'preferred-time';

  if (mode === 'preferred-time') {
    const blockedTimes = new Set();
    appointments.forEach(app => {
      blockedTimes.add(app.preferredTime);
    });
    
    return {
      date,
      service: { slug: service.slug, name: service.name },
      mode,
      timezone: TIMEZONE,
      businessHours,
      blockedTimes: Array.from(blockedTimes).sort(),
      message: 'Select a preferred time. Final availability is confirmed by the salon.'
    };
  } else {
    // slot-based mode
    const availableSlots = [];
    const duration = service.durationMinutes;

    let currentTimeStr = businessHours.open;
    const nowTimeStr = isToday(date) ? getCurrentSalonTime() : '00:00';

    while (currentTimeStr < businessHours.close) {
      const slotEndStr = addMinutes(currentTimeStr, duration);

      if (slotEndStr > businessHours.close) {
        break; // Service extends past closing
      }

      if (isToday(date) && currentTimeStr <= nowTimeStr) {
        currentTimeStr = addMinutes(currentTimeStr, slotInterval);
        continue;
      }

      let hasConflict = false;
      for (const app of appointments) {
        const appStart = app.preferredTime;
        const appEnd = app.service?.durationMinutes 
          ? addMinutes(appStart, app.service.durationMinutes)
          : addMinutes(appStart, slotInterval);

        if (isOverlap(currentTimeStr, slotEndStr, appStart, appEnd)) {
          hasConflict = true;
          break;
        }
      }

      if (!hasConflict) {
        availableSlots.push(currentTimeStr);
      }

      currentTimeStr = addMinutes(currentTimeStr, slotInterval);
    }

    return {
      date,
      service: { slug: service.slug, name: service.name },
      mode,
      timezone: TIMEZONE,
      businessHours,
      availableSlots
    };
  }
};
