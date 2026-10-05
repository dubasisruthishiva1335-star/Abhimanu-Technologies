import { createApp } from './app.js';
import { config } from './config.js';

const port = parseInt(process.env.PORT || config.port, 10);
const workerId = process.env.WORKER_ID || `worker-${port}`;

const app = createApp(workerId);

const server = app.listen(port, () => {
  console.log(`[Backend Server] ${workerId} active and listening on http://127.0.0.1:${port}`);
  console.log(`[Health Endpoint] http://127.0.0.1:${port}/api/health`);
  console.log(`[Telemetry API]   http://127.0.0.1:${port}/api/telemetry`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log(`[Backend Server] ${workerId} received SIGTERM, closing gracefully...`);
  server.close(() => {
    console.log(`[Backend Server] ${workerId} closed.`);
    process.exit(0);
  });
});
