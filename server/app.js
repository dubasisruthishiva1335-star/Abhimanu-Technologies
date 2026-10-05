import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleContactSubmit, handleGetContacts } from './controllers/contactController.js';
import { handleCalculateEstimate } from './controllers/estimatorController.js';
import { handleBookSchedule } from './controllers/scheduleController.js';
import { handleHealthAudit } from './controllers/auditController.js';
import { handleHealthCheck, handleGetTelemetry, recordRequestMetric } from './controllers/telemetryController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

export function createApp(workerId = 'worker-primary') {
  const app = express();

  // Basic Security & Headers Middleware
  app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Abhimanyu-Engine/1.0');
    res.setHeader('X-Worker-Node', workerId);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    recordRequestMetric();
    next();
  });

  // CORS Middleware
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Request-Id']
  }));

  // Body Parsing Middleware
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // In-Memory Rate Limiter (120 req / minute per IP)
  const rateLimitMap = new Map();
  app.use((req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, resetTime: now + 60000 };

    if (now > entry.resetTime) {
      entry.count = 1;
      entry.resetTime = now + 60000;
    } else {
      entry.count++;
    }
    rateLimitMap.set(ip, entry);

    if (entry.count > 120) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please throttle your traffic.'
      });
    }
    next();
  });

  // --- API Endpoints ---
  app.get('/api/health', handleHealthCheck);
  app.get('/api/telemetry', handleGetTelemetry);

  app.post('/api/contact', handleContactSubmit);
  app.get('/api/contact', handleGetContacts);

  app.post('/api/estimate', handleCalculateEstimate);
  app.post('/api/schedule', handleBookSchedule);
  app.post('/api/audit', handleHealthAudit);

  // Serve Built Frontend Assets if dist exists
  app.use(express.static(distDir));

  // SPA Fallback for client-side routing
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ success: false, error: 'API endpoint not found' });
    }
    res.sendFile(path.join(distDir, 'index.html'), (err) => {
      if (err) {
        next();
      }
    });
  });

  return app;
}
