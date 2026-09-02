import AppError from '../utils/AppError.js';
import { env } from '../config/env.js';
import { ZodError } from 'zod';

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Handle express built-in body-parser errors (e.g. 413 Payload Too Large)
  if (err.type === 'entity.too.large') {
    error = new AppError('Payload Too Large', 413, 'PAYLOAD_TOO_LARGE');
  }

  // Handle CORS error
  if (err.message === 'Not allowed by CORS') {
    error = new AppError('CORS Policy Blocked Request', 403, 'CORS_ERROR');
  }

  // Handle invalid JSON body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error = new AppError('Invalid JSON payload', 400, 'INVALID_JSON');
  }

  if (!(error instanceof AppError)) {
    if (error instanceof ZodError) {
      const fields = {};
      error.errors.forEach(e => {
        fields[e.path.join('.')] = e.message;
      });
      error = new AppError('Invalid request', 400, 'VALIDATION_ERROR', fields);
    } else {
      const statusCode = error.statusCode || 500;
      let message = error.message || 'Internal Server Error';
      
      // Mask Prisma/DB error messages
      if (error.name?.startsWith('Prisma') || statusCode === 500) {
        message = 'Internal Server Error';
      }
      
      error = new AppError(message, statusCode, 'UNKNOWN_ERROR');
      if (env.NODE_ENV === 'development') {
        error.stack = err.stack;
      }
    }
  }

  const response = {
    success: false,
    error: {
      code: error.code,
      message: error.message,
    }
  };

  if (req.id) {
    response.error.requestId = req.id;
  }

  if (error.details) {
    response.error.fields = error.details;
  }

  if (env.NODE_ENV === 'development' && error.stack) {
    response.error.stack = error.stack;
  }

  // Ensure we don't log passwords or tokens
  const logSafeBody = { ...req.body };
  if (logSafeBody.password) logSafeBody.password = '[REDACTED]';
  if (logSafeBody.token) logSafeBody.token = '[REDACTED]';

  if (error.statusCode >= 500) {
    console.error(`[${req.id || 'NO-ID'}] ERROR ${error.statusCode} ${req.method} ${req.originalUrl}:`, err);
  }

  res.status(error.statusCode).json(response);
};

export default errorHandler;
