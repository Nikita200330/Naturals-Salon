export const simpleRateLimit = (options) => {
  const { windowMs, max, message } = options;

  const ipRequests = new Map();

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    const record = ipRequests.get(ip);

    if (!record) {
      ipRequests.set(ip, {
        count: 1,
        startTime: now
      });
      return next();
    }

    if (now - record.startTime >= windowMs) {
      ipRequests.set(ip, {
        count: 1,
        startTime: now
      });
      return next();
    }

    if (record.count >= max) {
      return res.status(429).json({
        success: false,
        error: {
          code: 'TOO_MANY_REQUESTS',
          message:
            message ||
            'Too many requests, please try again later.'
        }
      });
    }

    record.count += 1;
    next();
  };
};
