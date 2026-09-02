export const TIMEZONE = 'Asia/Kolkata';

// Returns the current date in YYYY-MM-DD format for the salon timezone
export const getCurrentSalonDate = () => {
  const d = new Date().toLocaleString('en-US', { timeZone: TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit' });
  // d is like MM/DD/YYYY
  const [month, day, year] = d.split('/');
  return `${year}-${month}-${day}`;
};

// Returns current time in HH:mm (24h) for the salon timezone
export const getCurrentSalonTime = () => {
  const t = new Date().toLocaleString('en-US', { timeZone: TIMEZONE, hour: '2-digit', minute: '2-digit', hour12: false });
  // t might be like '24:xx' if hour12 is false and time is midnight?
  // Let's use Intl.DateTimeFormat parts to be safe
  const parts = new Intl.DateTimeFormat('en-GB', { 
    timeZone: TIMEZONE,
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false
  }).formatToParts(new Date());

  const hour = parts.find(p => p.type === 'hour').value;
  const minute = parts.find(p => p.type === 'minute').value;
  return `${hour}:${minute}`;
};

export const isPastDate = (dateStr) => {
  const today = getCurrentSalonDate();
  return dateStr < today;
};

export const isToday = (dateStr) => {
  return dateStr === getCurrentSalonDate();
};

export const isPastTimeToday = (dateStr, timeStr) => {
  if (isToday(dateStr)) {
    const nowTime = getCurrentSalonTime();
    return timeStr <= nowTime;
  }
  return false;
};

// Validates against business hours 09:00 <= time < 21:00
export const isWithinBusinessHours = (timeStr) => {
  if (timeStr < '09:00' || timeStr >= '21:00') {
    return false;
  }
  return true;
};

// Adds minutes to a HH:mm time string and returns a new HH:mm string
export const addMinutes = (timeStr, minutes) => {
  const [h, m] = timeStr.split(':').map(Number);
  const totalMins = h * 60 + m + minutes;
  const newH = Math.floor(totalMins / 60);
  const newM = totalMins % 60;
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
};

// Checks if two time intervals overlap. interval: { start: 'HH:mm', end: 'HH:mm' }
export const isOverlap = (start1, end1, start2, end2) => {
  return start1 < end2 && end1 > start2;
};
