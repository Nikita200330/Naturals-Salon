import prisma from '../config/db.js';

export const getBusiness = async (req, res, next) => {
  try {
    const settings = await prisma.businessSettings.findFirst();

    if (!settings) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'BUSINESS_SETTINGS_NOT_FOUND',
          message: 'Business settings are not configured.'
        }
      });
    }

    return res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

export const getBusinessHours = async (req, res, next) => {
  try {
    const settings = await prisma.businessSettings.findFirst();

    const openingTime = settings?.openingTime || '09:00';
    const closingTime = settings?.closingTime || '21:00';
    const timezone = settings?.timezone || 'Asia/Kolkata';

    return res.json({
      success: true,
      data: {
        timezone,
        openingTime,
        closingTime,
        schedule: {
          monday: { open: openingTime, close: closingTime },
          tuesday: { open: openingTime, close: closingTime },
          wednesday: { open: openingTime, close: closingTime },
          thursday: { open: openingTime, close: closingTime },
          friday: { open: openingTime, close: closingTime },
          saturday: { open: openingTime, close: closingTime },
          sunday: { open: openingTime, close: closingTime }
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
