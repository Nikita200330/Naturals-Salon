import { createFeedbackSchema, getFeedbackQuerySchema } from '../validators/feedback.validator.js';
import * as feedbackService from '../services/feedback.service.js';

export const submitFeedback = async (req, res, next) => {
  try {
    const validatedData = createFeedbackSchema.parse(req.body);
    
    const newFeedback = await feedbackService.createFeedback(validatedData);

    res.status(201).json({
      success: true,
      data: {
        id: newFeedback.id,
        status: newFeedback.status,
        message: 'Feedback submitted for review.'
      }
    });
  } catch (error) {
    if (error.code === 'DUPLICATE_FEEDBACK') {
      return res.status(409).json({
        success: false,
        error: {
          code: 'DUPLICATE_FEEDBACK',
          message: error.message
        }
      });
    }
    
    if (error.code === 'NOT_FOUND') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_SERVICE',
          message: error.message
        }
      });
    }

    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          details: error.errors
        }
      });
    }

    next(error);
  }
};

export const getApprovedFeedback = async (req, res, next) => {
  try {
    const validatedQuery = getFeedbackQuerySchema.parse(req.query);
    
    const result = await feedbackService.getPublicFeedback(validatedQuery);
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid query parameters',
          details: error.errors
        }
      });
    }
    next(error);
  }
};
