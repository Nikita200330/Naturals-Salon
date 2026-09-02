import * as servicesService from '../services/services.service.js';
import { validateServiceQuery } from '../validators/services.validator.js';

export const getServices = async (req, res, next) => {
  try {
    const { q, category } = validateServiceQuery(req.query);

    const services = await servicesService.findServices({ q, category });

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    if (error.name === 'ZodError' || error.isValidationError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid query parameters',
          details: error.errors || error.message,
        },
      });
    }
    next(error);
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const service = await servicesService.findServiceBySlug(slug);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'SERVICE_NOT_FOUND',
          message: 'Service not found',
        },
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};
