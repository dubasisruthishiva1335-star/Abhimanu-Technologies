import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  // Main Load Balancer & Server Ports
  port: parseInt(process.env.PORT || '5000', 10),
  lbPort: parseInt(process.env.LB_PORT || '5000', 10),
  env: process.env.NODE_ENV || 'development',

  // Upstream Worker Pool for the Load Balancer
  upstreams: [
    { id: 'worker-1', host: '127.0.0.1', port: 5001, weight: 1, healthy: true, activeConns: 0, totalRequests: 0, failedRequests: 0, lastCheckTime: null },
    { id: 'worker-2', host: '127.0.0.1', port: 5002, weight: 1, healthy: true, activeConns: 0, totalRequests: 0, failedRequests: 0, lastCheckTime: null },
    { id: 'worker-3', host: '127.0.0.1', port: 5003, weight: 1, healthy: true, activeConns: 0, totalRequests: 0, failedRequests: 0, lastCheckTime: null }
  ],

  // Load Balancing Algorithm: 'round-robin' | 'least-connections' | 'ip-hash'
  algorithm: process.env.LB_ALGORITHM || 'round-robin',

  // Health Check Settings
  healthCheck: {
    intervalMs: 8000,
    timeoutMs: 2500,
    unhealthyThreshold: 2,
    healthyThreshold: 1,
    endpoint: '/api/health'
  },

  // Circuit Breaker & Retry Settings
  retry: {
    maxRetries: 2,
    timeoutMs: 5000
  },

  // Rate Limiting Settings
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 120
  },

  // Local Data Storage Directory
  dataDir: path.join(__dirname, 'data')
};
