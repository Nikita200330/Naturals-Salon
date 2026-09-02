export const normalizeIndianPhone = (phone) => {
  if (!phone) return null;
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');

  if (cleaned.startsWith('+91')) {
    if (cleaned.length === 13) return cleaned;
    return null;
  }
  
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return '+' + cleaned;
  }
  
  if (cleaned.length === 10) {
    return '+91' + cleaned;
  }
  
  // If we have leading zeros like 09876543210
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    return '+91' + cleaned.slice(1);
  }
  
  return null;
};
