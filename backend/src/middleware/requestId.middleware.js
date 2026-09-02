import crypto from 'crypto';

export const requestIdMiddleware = (req, res, next) => {
  const reqId = crypto.randomUUID();
  req.id = reqId;
  res.setHeader('X-Request-ID', reqId);
  next();
};
