import { businessInfo } from '../data/businessInfo';

export const getStoreStatus = () => {
  // Use Indian Standard Time (IST) offset +5:30
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istDate = new Date(utc + (3600000 * 5.5));
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = days[istDate.getDay()];
  const currentHour = istDate.getHours();
  const currentMinutes = istDate.getMinutes();

  const todayHours = businessInfo.openingHours.find(h => h.day === currentDayName);
  
  if (!todayHours) return { isOpen: false, text: "Closed Now" };

  const isOpen = currentHour >= todayHours.open && currentHour < todayHours.close;

  if (isOpen) {
    return { isOpen: true, text: "OPEN NOW" };
  } else {
    // Determine next open time
    const openTimeStr = todayHours.open > 12 ? `${todayHours.open - 12}:00 PM` : `${todayHours.open}:00 AM`;
    
    let nextText = "";
    if (currentHour < todayHours.open) {
      nextText = `CLOSED NOW • Opens today at ${openTimeStr}`;
    } else {
      nextText = `CLOSED NOW • Opens tomorrow at ${openTimeStr}`;
    }
    return { isOpen: false, text: nextText };
  }
};
