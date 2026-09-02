import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import { API_VERSION } from './constants/index.js';
import { requestIdMiddleware } from './middleware/requestId.middleware.js';
import { globalRateLimit } from './middleware/globalRateLimit.middleware.js';

const app = express();

if (env.TRUST_PROXY === 'true') {
  app.set('trust proxy', 1);
}

// Request ID
app.use(requestIdMiddleware);

// Security Headers
app.use(helmet());

// CORS config
const allowedOrigins = env.CORS_ALLOWED_ORIGINS 
  ? env.CORS_ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : [env.FRONTEND_URL, env.ADMIN_FRONTEND_URL];

if (env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:5173');
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(globalRateLimit);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' })); // We rarely need nested objects in urlencoded

// Routes
app.use(`/api/${API_VERSION}`, routes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: 'API endpoint not found.'
    }
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
