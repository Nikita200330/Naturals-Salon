import { getCurrentSalonDate, getCurrentSalonTime, isPastDate, isWithinBusinessHours } from './backend/src/utils/salonTime.js';
console.log('Date:', getCurrentSalonDate());
console.log('Time:', getCurrentSalonTime());
console.log('Is Past:', isPastDate('2023-01-01'));
console.log('09:00 in hours?', isWithinBusinessHours('09:00'));
console.log('20:59 in hours?', isWithinBusinessHours('20:59'));
console.log('21:00 in hours?', isWithinBusinessHours('21:00'));
