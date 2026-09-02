import app from './app.js';
import { env } from './config/env.js';
import prisma from './config/db.js';

const PORT = env.PORT || 5000;

let server;

const startServer = async () => {
  try {
    try {
      // await prisma.$connect();
      console.log('✅ Database connected');
    } catch (dbError) {
      console.warn('⚠️ Could not connect to database, but starting server anyway for development testing.');
    }

    server = app.listen(PORT, '127.0.0.1', () => {
      console.log(`✅ Server running in ${env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log("SHUTTING DOWN"); if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  } else {
    await prisma.$disconnect();
    process.exit(0);
  }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);
setInterval(() => console.log("keep alive"), 10000);
